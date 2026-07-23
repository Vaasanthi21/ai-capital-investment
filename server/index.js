import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try loading env variables
try {
    process.loadEnvFile();
} catch (e) {
    // .env file missing, ignore
}

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
let DB_FILE = path.join(process.cwd(), 'server', 'db.json');

// Vercel serverless environment compatibility (ephemeral writable DB)
if (process.env.VERCEL) {
    const tempDbPath = path.join('/tmp', 'db.json');
    try {
        if (!fs.existsSync(tempDbPath)) {
            const initialData = fs.readFileSync(DB_FILE, 'utf8');
            fs.writeFileSync(tempDbPath, initialData, 'utf8');
        }
        DB_FILE = tempDbPath;
        console.log(`Vercel environment detected. Using writable DB at: ${DB_FILE}`);
    } catch (err) {
        console.error('Error setting up Vercel writable DB fallback:', err);
    }
}

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

let transporter = null;
if (EMAIL_USER && EMAIL_PASS) {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    });
    console.log(`Email service configured successfully for ${EMAIL_USER}`);
} else {
    console.log(`Notice: EMAIL_USER or EMAIL_PASS environment variables are missing. Emails will not be sent, but OTPs will still print to the console.`);
}

// Branded HTML email dispatcher
async function sendEmailOtp(email, otpCode, purpose) {
    const isSignup = purpose === 'signup';
    const subject = isSignup ? 'Verify Your AI Capital Account' : 'Reset Your AI Capital Password';
    const titleText = isSignup ? 'Confirm Your Registration' : 'Password Recovery Request';
    const actionText = isSignup ? 'verifying your email address' : 'resetting your password';

    const htmlContent = `
        <div style="font-family: 'Outfit', Helvetica, Arial, sans-serif; background-color: #060e08; color: #ffffff; padding: 40px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(0, 230, 118, 0.15); box-sizing: border-box;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #00e676; font-size: 2.5rem; font-weight: 800; margin: 0; text-shadow: 0 0 15px rgba(0, 230, 118, 0.4);">AI Capital</h1>
                <p style="color: #d4af37; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em; margin: 5px 0 0 0;">Investment</p>
            </div>
            
            <div style="background-color: rgba(6, 18, 10, 0.7); border: 1px solid rgba(255, 255, 255, 0.05); padding: 30px; border-radius: 10px; margin-bottom: 30px; backdrop-filter: blur(10px);">
                <h2 style="font-size: 1.4rem; color: #ffffff; margin-top: 0; font-weight: 600;">${titleText}</h2>
                <p style="color: #a1b3b8; font-size: 0.95rem; line-height: 1.6;">
                    Thank you for using AI Capital Investment. Use the one-time password (OTP) below for ${actionText}. This code is valid for 5 minutes.
                </p>
                
                <div style="background: linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(0,230,118,0.1) 100%); border: 1.5px dashed #d4af37; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
                    <span style="font-family: monospace; font-size: 2.2rem; font-weight: 800; color: #ffe066; letter-spacing: 0.4em; padding-left: 0.4em; text-shadow: 0 0 10px rgba(212,175,55,0.4);">${otpCode}</span>
                </div>
                
                <p style="color: #62777d; font-size: 0.8rem; line-height: 1.5; margin-bottom: 0;">
                    If you did not request this verification, you can safely ignore this email. Someone else may have typed your email address by mistake.
                </p>
            </div>
            
            <div style="text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.04); padding-top: 20px; font-size: 0.78rem; color: #62777d;">
                <p>&copy; ${new Date().getFullYear()} AI Capital Investment. All rights reserved.</p>
                <p>New York, NY | info@aicapital.com</p>
            </div>
        </div>
    `;

    if (!transporter) {
        console.log(`[EMAIL SIMULATION] Sent to: ${email} | Subject: ${subject} | Code: ${otpCode}`);
        return false;
    }

    try {
        await transporter.sendMail({
            from: `"AI Capital Verification" <${EMAIL_USER}>`,
            to: email,
            subject: subject,
            html: htmlContent
        });
        console.log(`[EMAIL SENT] Real verification email successfully sent to ${email}`);
        return true;
    } catch (err) {
        console.error(`Failed to send real email to ${email}:`, err);
        return false;
    }
}

// In-memory fallback database for serverless environments (Vercel)
const fallbackDatabase = {
  "users": [
    {
      "name": "John Doe",
      "email": "john@gmail.com",
      "phone": "+911234567890",
      "investmentAmount": 10000,
      "riskTolerance": "Balanced",
      "goal": "Retirement",
      "password": "$2b$10$/ysKCmDaCs.91gn0izVSNOzhopDnH6yMIXE6swcCs0u/Cw/Omjf9e",
      "is_verified": true,
      "created_at": "2026-07-17T12:32:28.355Z",
      "activeProposal": null
    },
    {
      "name": "John Doe",
      "email": "johndoe@gmail.com",
      "phone": "1234567890",
      "investmentAmount": 25000,
      "riskTolerance": "Balanced",
      "goal": "Growth",
      "password": "$2b$10$/ysKCmDaCs.91gn0izVSNOzhopDnH6yMIXE6swcCs0u/Cw/Omjf9e",
      "role": "advisor",
      "advisorMessage": "",
      "activeProposal": null,
      "is_verified": true,
      "created_at": "2026-07-18T12:40:52.494Z"
    }
  ],
  "otps": [],
  "messages": [],
  "transactions": [
    {
      "id": "TXN-902418",
      "email": "john@gmail.com",
      "type": "deposit",
      "amount": 25000,
      "tier": "Growth Strategy Vault",
      "date": "2026-07-17T12:35:00.000Z",
      "paymentMethod": "Visa ending in 4242",
      "status": "Completed"
    },
    {
      "id": "TXN-881940",
      "email": "john@gmail.com",
      "type": "credit",
      "amount": 1420.50,
      "tier": "AI Portfolio Yield Payout",
      "date": "2026-07-20T09:15:00.000Z",
      "paymentMethod": "Automated Rebalance Dividend",
      "status": "Credited"
    },
    {
      "id": "TXN-762109",
      "email": "john@gmail.com",
      "type": "deposit",
      "amount": 10000,
      "tier": "Starter Vault Top-Up",
      "date": "2026-07-21T16:20:00.000Z",
      "paymentMethod": "Mastercard ending in 8812",
      "status": "Completed"
    },
    {
      "id": "TXN-654012",
      "email": "john@gmail.com",
      "type": "credit",
      "amount": 350.00,
      "tier": "Staking & Crypto Bond Dividend",
      "date": "2026-07-22T08:00:00.000Z",
      "paymentMethod": "AI Yield Auto-Credit",
      "status": "Credited"
    }
  ]
};

let inMemoryDB = null;

// Helper to load DB
function loadDB() {
    if (inMemoryDB) return inMemoryDB;
    
    try {
        if (!fs.existsSync(DB_FILE)) {
            // Try copying from root as absolute backup
            const rootDbPath = path.join(process.cwd(), 'server', 'db.json');
            if (fs.existsSync(rootDbPath)) {
                const data = fs.readFileSync(rootDbPath, 'utf8');
                fs.writeFileSync(DB_FILE, data, 'utf8');
            } else {
                fs.writeFileSync(DB_FILE, JSON.stringify(fallbackDatabase, null, 2), 'utf8');
            }
        }
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        inMemoryDB = JSON.parse(raw);
        if (!inMemoryDB.messages) {
            inMemoryDB.messages = [];
        }
        if (!inMemoryDB.transactions || inMemoryDB.transactions.length === 0) {
            inMemoryDB.transactions = [
                {
                    id: "TXN-902418",
                    email: "john@gmail.com",
                    type: "deposit",
                    amount: 25000,
                    tier: "Growth Strategy Vault",
                    date: "2026-07-17T12:35:00.000Z",
                    paymentMethod: "Visa ending in 4242",
                    status: "Completed"
                },
                {
                    id: "TXN-881940",
                    email: "john@gmail.com",
                    type: "credit",
                    amount: 1420.50,
                    tier: "AI Portfolio Yield Payout",
                    date: "2026-07-20T09:15:00.000Z",
                    paymentMethod: "Automated Rebalance Dividend",
                    status: "Credited"
                },
                {
                    id: "TXN-762109",
                    email: "john@gmail.com",
                    type: "deposit",
                    amount: 10000,
                    tier: "Starter Vault Top-Up",
                    date: "2026-07-21T16:20:00.000Z",
                    paymentMethod: "Mastercard ending in 8812",
                    status: "Completed"
                },
                {
                    id: "TXN-654012",
                    email: "john@gmail.com",
                    type: "credit",
                    amount: 350.00,
                    tier: "Staking & Crypto Bond Dividend",
                    date: "2026-07-22T08:00:00.000Z",
                    paymentMethod: "AI Yield Auto-Credit",
                    status: "Credited"
                }
            ];
        }
        if (!inMemoryDB.meetings || inMemoryDB.meetings.length === 0) {
            inMemoryDB.meetings = [
                {
                    id: "MTG-402918",
                    clientEmail: "john@gmail.com",
                    clientName: "John Investor",
                    advisorEmail: "johndoe@gmail.com",
                    date: "2026-07-25",
                    time: "14:30",
                    topic: "Q3 Wealth Rebalancing & Tax-Loss Harvesting Review",
                    meetLink: "https://meet.aicapital.com/room-4029",
                    status: "Scheduled",
                    createdAt: "2026-07-22T10:00:00.000Z"
                },
                {
                    id: "MTG-310892",
                    clientEmail: "john@gmail.com",
                    clientName: "John Investor",
                    advisorEmail: "johndoe@gmail.com",
                    date: "2026-07-15",
                    time: "11:00",
                    topic: "Initial Risk Tolerance & Growth Strategy Orientation",
                    meetLink: "https://meet.aicapital.com/room-3108",
                    status: "Completed",
                    createdAt: "2026-07-14T09:00:00.000Z"
                }
            ];
        }
        return inMemoryDB;
    } catch (e) {
        console.error("Database load error, falling back to memory:", e);
        inMemoryDB = JSON.parse(JSON.stringify(fallbackDatabase));
        return inMemoryDB;
    }
}

// Helper to save DB
function saveDB(db) {
    inMemoryDB = db;
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
    } catch (e) {
        console.error("Database save failed (expected in read-only serverless):", e);
    }
}

// Ensure database file is initialized
loadDB();

// Endpoints

// Signup
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, phone, investmentAmount, riskTolerance, goal, password, role } = req.body;
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }
        
        const db = loadDB();
        // Check if email already registered and verified
        const existingUser = db.users.find(u => u.email === email);
        if (existingUser && existingUser.is_verified) {
            return res.status(400).json({ error: 'Email already registered.' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Update or create user
        const userData = {
            name,
            email,
            phone,
            investmentAmount: parseFloat(investmentAmount) || 10000,
            riskTolerance: riskTolerance || 'Balanced',
            goal: goal || 'Growth',
            password: hashedPassword,
            role: role || 'investor',
            advisorMessage: '',
            activeProposal: null,
            is_verified: false,
            created_at: new Date().toISOString()
        };

        if (existingUser) {
            Object.assign(existingUser, userData);
        } else {
            db.users.push(userData);
        }

        // Generate 6-digit OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 5 * 60 * 1000; // 5 mins

        // Remove existing signup OTPs for this email
        db.otps = db.otps.filter(o => !(o.email === email && o.purpose === 'signup'));
        db.otps.push({ email, otp_code: otpCode, purpose: 'signup', expires_at: expiresAt });

        saveDB(db);

        console.log(`\n======================================================`);
        console.log(`[SIGNUP OTP] Email: ${email} | OTP: ${otpCode}`);
        console.log(`======================================================\n`);

        // Send email
        await sendEmailOtp(email, otpCode, 'signup');

        res.json({ message: 'Signup success, please verify OTP.', email, debugOtp: otpCode });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during signup.' });
    }
});

// Resend OTP
app.post('/api/auth/resend-otp', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email is required.' });
        }

        const db = loadDB();
        const user = db.users.find(u => u.email === email);
        if (!user) {
            return res.status(400).json({ error: 'No pending registration found for this email.' });
        }
        if (user.is_verified) {
            return res.status(400).json({ error: 'Account is already verified. Please log in.' });
        }

        // Generate new 6-digit OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 5 * 60 * 1000; // 5 mins

        db.otps = db.otps.filter(o => !(o.email === email && o.purpose === 'signup'));
        db.otps.push({ email, otp_code: otpCode, purpose: 'signup', expires_at: expiresAt });

        saveDB(db);

        console.log(`\n======================================================`);
        console.log(`[RESENT SIGNUP OTP] Email: ${email} | OTP: ${otpCode}`);
        console.log(`======================================================\n`);

        // Send email
        await sendEmailOtp(email, otpCode, 'signup');

        res.json({ message: 'OTP resent successfully.', email, debugOtp: otpCode });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during OTP resend.' });
    }
});

// Verify OTP
app.post('/api/auth/verify-otp', (req, res) => {
    try {
        const { email, otpCode } = req.body;
        if (!email || !otpCode) {
            return res.status(400).json({ error: 'Email and OTP code are required.' });
        }
        
        const db = loadDB();
        
        // Find valid OTP
        const otpIdx = db.otps.findIndex(o => o.email === email && o.otp_code === otpCode && o.purpose === 'signup' && o.expires_at > Date.now());
        if (otpIdx === -1) {
            return res.status(400).json({ error: 'Invalid or expired OTP.' });
        }
        
        // Mark user as verified
        const user = db.users.find(u => u.email === email);
        if (!user) {
            return res.status(400).json({ error: 'User registration not found.' });
        }
        
        user.is_verified = true;
        // Clean up this OTP
        db.otps.splice(otpIdx, 1);
        saveDB(db);

        res.json({ message: 'Account verified successfully!', user: { name: user.name, email: user.email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during OTP verification.' });
    }
});

// Fund Account / Deposit
app.post('/api/investor/deposit', (req, res) => {
    try {
        const { email, amount, tier, cardLast4 } = req.body;
        if (!email || !amount) {
            return res.status(400).json({ error: 'Email and deposit amount are required.' });
        }
        
        const db = loadDB();
        const user = db.users.find(u => u.email === email);
        if (!user) {
            return res.status(404).json({ error: 'User account not found.' });
        }
        
        const depositVal = parseFloat(amount) || 0;
        user.investmentAmount = (user.investmentAmount || 0) + depositVal;
        
        if (!db.transactions) db.transactions = [];

        const newTxn = {
            id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
            email: user.email,
            type: 'deposit',
            amount: depositVal,
            tier: tier || 'Custom Capital Deposit',
            date: new Date().toISOString(),
            paymentMethod: `Card ending in ${cardLast4 || '4242'}`,
            status: 'Completed'
        };

        db.transactions.unshift(newTxn);
        saveDB(db);
        
        const userTxns = db.transactions.filter(t => t.email === email);

        res.json({
            message: 'Account deposited successfully!',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                investmentAmount: user.investmentAmount,
                riskTolerance: user.riskTolerance,
                goal: user.goal,
                role: user.role || 'investor',
                advisorMessage: user.advisorMessage || '',
                activeProposal: user.activeProposal || null
            },
            transaction: newTxn,
            transactions: userTxns
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during account deposit.' });
    }
});

// Legacy Fund Account endpoint compatibility
app.post('/api/auth/fund-account', (req, res) => {
    try {
        const { email, amount } = req.body;
        if (!email || !amount) {
            return res.status(400).json({ error: 'Email and deposit amount are required.' });
        }
        
        const db = loadDB();
        const user = db.users.find(u => u.email === email);
        if (!user) {
            return res.status(404).json({ error: 'User account not found.' });
        }
        
        user.investmentAmount = parseFloat(amount) || 10000;
        saveDB(db);
        
        res.json({ message: 'Account funded successfully!', user: { email: user.email, investmentAmount: user.investmentAmount } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during account funding.' });
    }
});

// Get User Transactions
app.get('/api/investor/transactions', (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ error: 'Email is required.' });
        }

        const db = loadDB();
        const userTxns = (db.transactions || []).filter(t => t.email === email);
        res.json(userTxns);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error retrieving transaction history.' });
    }
});

// Advisor Meetings Endpoints
app.get('/api/advisor/meetings', (req, res) => {
    try {
        const db = loadDB();
        res.json(db.meetings || []);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error retrieving meetings.' });
    }
});

app.post('/api/advisor/meetings/create', (req, res) => {
    try {
        const { clientEmail, clientName, advisorEmail, date, time, topic, meetLink } = req.body;
        if (!clientEmail || !date || !time || !topic) {
            return res.status(400).json({ error: 'Missing required meeting details.' });
        }
        const db = loadDB();
        if (!db.meetings) db.meetings = [];

        const newMeeting = {
            id: `MTG-${Math.floor(100000 + Math.random() * 900000)}`,
            clientEmail,
            clientName: clientName || 'Verified Investor',
            advisorEmail: advisorEmail || 'johndoe@gmail.com',
            date,
            time,
            topic,
            meetLink: meetLink || `https://meet.aicapital.com/room-${Math.floor(1000 + Math.random() * 9000)}`,
            status: 'Scheduled',
            createdAt: new Date().toISOString()
        };

        db.meetings.unshift(newMeeting);
        saveDB(db);
        res.json({ message: 'Meeting scheduled successfully!', meeting: newMeeting, meetings: db.meetings });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error creating meeting.' });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }
        
        const db = loadDB();
        const user = db.users.find(u => u.email === email);
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }
        if (!user.is_verified) {
            return res.status(400).json({ error: 'Account is not verified yet. Please sign up again to verify.' });
        }
        
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }
        
        res.json({
            message: 'Login successful!',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                investmentAmount: user.investmentAmount,
                riskTolerance: user.riskTolerance,
                goal: user.goal,
                role: user.role || 'investor',
                advisorMessage: user.advisorMessage || '',
                activeProposal: user.activeProposal || null
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during login.' });
    }
});

// Forgot Password
app.post('/api/auth/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email is required.' });
        }
        
        const db = loadDB();
        const user = db.users.find(u => u.email === email && u.is_verified);
        if (!user) {
            return res.status(400).json({ error: 'No verified account found with this email.' });
        }
        
        // Generate OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 5 * 60 * 1000;

        db.otps = db.otps.filter(o => !(o.email === email && o.purpose === 'reset'));
        db.otps.push({ email, otp_code: otpCode, purpose: 'reset', expires_at: expiresAt });

        saveDB(db);

        console.log(`\n======================================================`);
        console.log(`[RESET PASSWORD OTP] Email: ${email} | OTP: ${otpCode}`);
        console.log(`======================================================\n`);

        // Send email
        await sendEmailOtp(email, otpCode, 'reset');

        res.json({ message: 'Reset OTP generated successfully.', email, debugOtp: otpCode });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during password reset request.' });
    }
});

// Reset Password
app.post('/api/auth/reset-password', async (req, res) => {
    try {
        const { email, otpCode, newPassword } = req.body;
        if (!email || !otpCode || !newPassword) {
            return res.status(400).json({ error: 'Email, OTP, and new password are required.' });
        }
        
        const db = loadDB();
        
        // Verify OTP
        const otpIdx = db.otps.findIndex(o => o.email === email && o.otp_code === otpCode && o.purpose === 'reset' && o.expires_at > Date.now());
        if (otpIdx === -1) {
            return res.status(400).json({ error: 'Invalid or expired OTP.' });
        }
        
        const user = db.users.find(u => u.email === email);
        if (!user) {
            return res.status(400).json({ error: 'User not found.' });
        }
        
        // Hash and update
        user.password = await bcrypt.hash(newPassword, 10);
        
        // Clean up OTP
        db.otps.splice(otpIdx, 1);
        saveDB(db);

        res.json({ message: 'Password reset successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during password reset.' });
    }
});

// Advisor Endpoints

// Get all verified investors
app.get('/api/advisor/clients', (req, res) => {
    try {
        const db = loadDB();
        const clients = db.users
            .filter(u => u.is_verified && (u.role === 'investor' || !u.role))
            .map(u => ({
                name: u.name,
                email: u.email,
                phone: u.phone,
                investmentAmount: u.investmentAmount,
                riskTolerance: u.riskTolerance,
                goal: u.goal,
                advisorMessage: u.advisorMessage || '',
                activeProposal: u.activeProposal || null
            }));
        res.json(clients);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error fetching clients.' });
    }
});

// Update advisor message for client
app.post('/api/advisor/update-message', (req, res) => {
    try {
        const { investorEmail, message } = req.body;
        if (!investorEmail) {
            return res.status(400).json({ error: 'Investor email is required.' });
        }
        
        const db = loadDB();
        const user = db.users.find(u => u.email === investorEmail);
        if (!user) {
            return res.status(404).json({ error: 'Investor not found.' });
        }
        
        user.advisorMessage = message || '';
        saveDB(db);
        
        res.json({ message: 'Advisor recommendation updated successfully!', advisorMessage: user.advisorMessage });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error updating advisor recommendation.' });
    }
});

// Dispatch structured proposal from advisor to client
app.post('/api/advisor/dispatch-proposal', (req, res) => {
    try {
        const { investorEmail, proposal } = req.body;
        if (!investorEmail || !proposal) {
            return res.status(400).json({ error: 'Investor email and allocation proposal are required.' });
        }
        
        const db = loadDB();
        const user = db.users.find(u => u.email === investorEmail);
        if (!user) {
            return res.status(404).json({ error: 'Investor not found.' });
        }
        
        user.activeProposal = {
            equities: parseFloat(proposal.equities) || 0,
            bonds: parseFloat(proposal.bonds) || 0,
            cash: parseFloat(proposal.cash) || 0,
            gold: parseFloat(proposal.gold) || 0,
            text: proposal.text || ''
        };
        
        saveDB(db);
        
        res.json({ message: 'Allocation proposal dispatched successfully!', activeProposal: user.activeProposal });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error dispatching proposal.' });
    }
});

// Investor approves and executes proposal
app.post('/api/investor/execute-proposal', (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'User email is required.' });
        }
        
        const db = loadDB();
        const user = db.users.find(u => u.email === email);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        
        if (!user.activeProposal) {
            return res.status(400).json({ error: 'No active allocation proposal found for this account.' });
        }
        
        // Update user risk tolerance label based on equities weight
        const eq = user.activeProposal.equities;
        if (eq >= 65) {
            user.riskTolerance = 'Aggressive';
        } else if (eq >= 35) {
            user.riskTolerance = 'Balanced';
        } else {
            user.riskTolerance = 'Conservative';
        }
        
        // Clear active proposal
        user.activeProposal = null;
        saveDB(db);
        
        res.json({ message: 'Allocation proposal executed successfully!', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error executing proposal.' });
    }
});

// Chat System: Send a message
app.post('/api/chat/send', (req, res) => {
    try {
        const { sender, receiver, text } = req.body;
        if (!sender || !receiver || !text) {
            return res.status(400).json({ error: 'Sender, receiver, and text are required.' });
        }
        const db = loadDB();
        const msg = {
            sender,
            receiver,
            text,
            timestamp: new Date().toISOString()
        };
        db.messages.push(msg);
        saveDB(db);
        res.json({ message: 'Message sent successfully!', msg });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error sending message.' });
    }
});

// Chat System: Get chat history between two users
app.get('/api/chat/history', (req, res) => {
    try {
        const { user1, user2 } = req.query;
        if (!user1 || !user2) {
            return res.status(400).json({ error: 'Both user1 and user2 query parameters are required.' });
        }
        const db = loadDB();
        const history = db.messages.filter(m => 
            (m.sender === user1 && m.receiver === user2) || 
            (m.sender === user2 && m.receiver === user1)
        );
        res.json(history);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error retrieving message history.' });
    }
});

// Lead Capture API Endpoints for Landing Page & Blogs
app.post('/api/leads', (req, res) => {
    try {
        const { name, email, phone, budget, interest, message } = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({ error: 'Name, email, and phone number are required.' });
        }
        const db = loadDB();
        if (!db.leads) db.leads = [];

        const newLead = {
            id: `LEAD-${Math.floor(100000 + Math.random() * 900000)}`,
            name,
            email,
            phone,
            budget: budget || '$25,000 - $100,000',
            interest: interest || 'AI Wealth Management',
            message: message || '',
            status: 'New Lead',
            created_at: new Date().toISOString()
        };

        db.leads.unshift(newLead);
        saveDB(db);

        console.log(`\n======================================================`);
        console.log(`[NEW LEAD CAPTURED] ${name} | ${email} | ${phone} | Budget: ${newLead.budget}`);
        console.log(`======================================================\n`);

        res.json({ message: 'Lead captured successfully! A SEBI/SEC advisor will contact you shortly.', lead: newLead });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error capturing lead.' });
    }
});

app.get('/api/leads', (req, res) => {
    try {
        const db = loadDB();
        res.json(db.leads || []);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error fetching leads.' });
    }
});

if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Backend server running on http://localhost:${PORT}`);
    });
}

export default app;
