import fs from 'fs';
import path from 'path';
import { 
    Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
    HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType 
} from 'docx';

const outputDocxPath = "C:\\Users\\vasan\\.gemini\\antigravity\\brain\\fbf9b8bf-26d9-40e1-8aa7-c73ca3783efb\\SOP_AI_Capital_Investment_Website_Operations.docx";

// Standard A4 printable width in dxa = 9200 (approx 6.4 inches)
function createHeaderCell(text, dxaWidth) {
    return new TableCell({
        width: { size: dxaWidth, type: WidthType.DXA },
        shading: { fill: "FFFFFF", type: ShadingType.CLEAR }, // Pure White Background
        margins: { top: 140, bottom: 140, left: 160, right: 160 },
        borders: {
            top: { style: BorderStyle.SINGLE, size: 8, color: "000000" },
            bottom: { style: BorderStyle.SINGLE, size: 12, color: "000000" },
            left: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
            right: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
        },
        children: [
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({ text: text, bold: true, color: "000000", size: 20, font: "Calibri" })
                ]
            })
        ]
    });
}

function createBodyCell(text, dxaWidth, isBold = false) {
    return new TableCell({
        width: { size: dxaWidth, type: WidthType.DXA },
        shading: { fill: "FFFFFF", type: ShadingType.CLEAR }, // Pure White Background
        margins: { top: 120, bottom: 120, left: 160, right: 160 },
        borders: {
            top: { style: BorderStyle.SINGLE, size: 2, color: "000000" },
            bottom: { style: BorderStyle.SINGLE, size: 2, color: "000000" },
            left: { style: BorderStyle.SINGLE, size: 2, color: "000000" },
            right: { style: BorderStyle.SINGLE, size: 2, color: "000000" },
        },
        children: [
            new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({ text: text, bold: isBold, color: "000000", size: 19, font: "Calibri" })
                ]
            })
        ]
    });
}

const doc = new Document({
    sections: [{
        properties: {
            page: {
                margin: {
                    top: 1000,
                    bottom: 1000,
                    left: 1000,
                    right: 1000
                }
            }
        },
        children: [
            // Title Header (Pure Black & Bold Only)
            new Paragraph({
                alignment: AlignmentType.CENTER,
                space: { before: 100, after: 60 },
                children: [
                    new TextRun({ text: "AI CAPITAL INVESTMENT", bold: true, size: 36, color: "000000", font: "Calibri" }),
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                space: { after: 60 },
                children: [
                    new TextRun({ text: "STANDARD OPERATING PROCEDURE (SOP)", bold: true, size: 26, color: "000000", font: "Calibri" }),
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                space: { after: 200 },
                children: [
                    new TextRun({ text: "Comprehensive Operational Guide for the Entire Website Platform", bold: true, italic: true, size: 20, color: "000000", font: "Calibri" }),
                ]
            }),

            // Document Control Box
            new Paragraph({
                space: { after: 60 },
                children: [
                    new TextRun({ text: "Document ID: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "SOP-OPS-2026-003    |    ", font: "Calibri" }),
                    new TextRun({ text: "Version: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "3.0 (Monochrome Edition)    |    ", font: "Calibri" }),
                    new TextRun({ text: "Effective Date: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "July 23, 2026", font: "Calibri" })
                ]
            }),
            new Paragraph({
                space: { after: 250 },
                children: [
                    new TextRun({ text: "Live URL: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "https://ai-capital-investment.vercel.app/    |    ", font: "Calibri" }),
                    new TextRun({ text: "SEBI Registration: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "INA000098765    |    ", font: "Calibri" }),
                    new TextRun({ text: "SEC RIA: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "#801-123456", font: "Calibri" })
                ]
            }),

            // Section 1: Executive Overview
            new Paragraph({
                text: "1. Executive Overview & System Scope",
                heading: HeadingLevel.HEADING_1,
                space: { before: 200, after: 100 }
            }),
            new Paragraph({
                space: { after: 250 },
                children: [
                    new TextRun({
                        text: "This Standard Operating Procedure (SOP) serves as the authoritative operational manual for the entire AI Capital Investment web application. It covers end-to-end user navigation, visitor lead capture, 6-digit email OTP authentication, financial advisor CRM workflows, investor wealth management dashboards, AI algorithmic portfolio rebalancing, automated tax-loss harvesting, subscription payment processing, and regulatory compliance requirements.",
                        size: 21,
                        font: "Calibri"
                    })
                ]
            }),

            // Section 2: User Access Hierarchy Table
            new Paragraph({
                text: "2. User Access Hierarchy & Roles",
                heading: HeadingLevel.HEADING_1,
                space: { before: 200, after: 120 }
            }),
            new Table({
                width: { size: 9200, type: WidthType.DXA },
                columnWidths: [2200, 3000, 4000],
                rows: [
                    new TableRow({
                        tableHeader: true,
                        cantSplit: true,
                        children: [
                            createHeaderCell("User Role", 2200),
                            createHeaderCell("Description", 3000),
                            createHeaderCell("Platform Access Scope", 4000)
                        ]
                    }),
                    new TableRow({
                        cantSplit: true,
                        children: [
                            createBodyCell("Guest / Visitor", 2200, true),
                            createBodyCell("Unauthenticated public visitors exploring wealth solutions.", 3000),
                            createBodyCell("Landing Page, Services Overview, Asset Allocation breakdown, FAQ, Standalone Market Research Blogs, Lead Capture Consultation Form.", 4000)
                        ]
                    }),
                    new TableRow({
                        cantSplit: true,
                        children: [
                            createBodyCell("Registered Investor", 2200, true),
                            createBodyCell("Individual & institutional wealth clients.", 3000),
                            createBodyCell("Investor Dashboard, Real-time Asset Allocation Charts, AI Rebalancing, Automated Tax-Loss Harvesting, Advisor Communication Thread, Transaction History.", 4000)
                        ]
                    }),
                    new TableRow({
                        cantSplit: true,
                        children: [
                            createBodyCell("Financial Advisor / Admin", 2200, true),
                            createBodyCell("SEBI & SEC Registered Fiduciary Advisors.", 3000),
                            createBodyCell("Advisor Dashboard, Prospect Leads (CRM), Client Roster Management, Custom Allocation Proposal Dispatch, Meeting Scheduling, Macro Signal Dispatcher.", 4000)
                        ]
                    })
                ]
            }),
            new Paragraph({ text: "", space: { after: 300 } }),

            // Section 3: Public Landing Page & Visitor Experience
            new Paragraph({
                text: "3. Public Landing Page & Visitor Navigation",
                heading: HeadingLevel.HEADING_1,
                space: { before: 200, after: 100 }
            }),
            new Paragraph({
                space: { after: 60 },
                children: [
                    new TextRun({ text: "• Hero Section: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "Presents platform value proposition ('Intelligent Wealth Management for the Modern Investor') with one-click CTA buttons to Get Started or Sign In.", font: "Calibri" })
                ]
            }),
            new Paragraph({
                space: { after: 60 },
                children: [
                    new TextRun({ text: "• Services & Asset Allocation Breakdown: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "Outlines quantitative asset management strategies across Equities, Fixed Income, Crypto, Gold, and Cash reserves.", font: "Calibri" })
                ]
            }),
            new Paragraph({
                space: { after: 250 },
                children: [
                    new TextRun({ text: "• FAQ & Navigation Header: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "Provides instant answers regarding SEBI/SEC fiduciary oversight, minimum capital thresholds, and automated rebalancing.", font: "Calibri" })
                ]
            }),

            // Section 4: Standalone Market Research & Blog System
            new Paragraph({
                text: "4. Market Research & Standalone Blog System",
                heading: HeadingLevel.HEADING_1,
                space: { before: 200, after: 100 }
            }),
            new Paragraph({
                space: { after: 60 },
                children: [
                    new TextRun({ text: "• Standalone View (No Popups): ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "Visitors can access market research directly via the standalone blog interface without triggering secondary windows or external tabs.", font: "Calibri" })
                ]
            }),
            new Paragraph({
                space: { after: 60 },
                children: [
                    new TextRun({ text: "• Bilingual Support: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "Includes instant English and Hindi language translation toggles for all articles.", font: "Calibri" })
                ]
            }),
            new Paragraph({
                space: { after: 250 },
                children: [
                    new TextRun({ text: "• Article Catalog & Categories: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "Covers AI Wealth Management, Tax Strategy, Crypto Yields, and Risk Optimization.", font: "Calibri" })
                ]
            }),

            // Section 5: Lead Capture Form & Advisor CRM Backend
            new Paragraph({
                text: "5. Lead Capture Form & Advisor CRM Backend",
                heading: HeadingLevel.HEADING_1,
                space: { before: 200, after: 100 }
            }),
            new Paragraph({
                space: { after: 60 },
                children: [
                    new TextRun({ text: "• Purpose & Functionality: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "Captures high-intent investor prospects seeking personalized portfolio advice.", font: "Calibri" })
                ]
            }),
            new Paragraph({
                space: { after: 60 },
                children: [
                    new TextRun({ text: "• Required Prospect Fields: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "Full Name, Email Address, Phone Number, Investment Capital Budget, Primary Interest Area, and Optional Message.", font: "Calibri" })
                ]
            }),
            new Paragraph({
                space: { after: 60 },
                children: [
                    new TextRun({ text: "• Form Locations: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "Embedded on the Landing Page (#consultation) and at the bottom of Standalone Blog pages.", font: "Calibri" })
                ]
            }),
            new Paragraph({
                space: { after: 250 },
                children: [
                    new TextRun({ text: "• Senior Advisor CRM Routing: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "Submitted leads instantly store in the backend database and render under the 'Captured Leads (CRM)' tab in the Advisor Dashboard. Advisors can search, filter by status ('New Lead', 'Contacted', 'Converted'), and initiate callback consultations.", font: "Calibri" })
                ]
            }),

            // Section 6: User Onboarding & Email OTP Verification
            new Paragraph({
                text: "6. User Registration & 6-Digit Email OTP Workflow",
                heading: HeadingLevel.HEADING_1,
                space: { before: 200, after: 100 }
            }),
            new Paragraph({
                space: { after: 60 },
                children: [
                    new TextRun({ text: "1. Account Registration: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "New users complete signup selecting role (Investor or Advisor), phone, budget, and password.", font: "Calibri" })
                ]
            }),
            new Paragraph({
                space: { after: 60 },
                children: [
                    new TextRun({ text: "2. OTP Email Dispatch: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "The backend generates a secure 6-digit OTP code valid for 5 minutes and dispatches a branded HTML email.", font: "Calibri" })
                ]
            }),
            new Paragraph({
                space: { after: 250 },
                children: [
                    new TextRun({ text: "3. Account Verification & Recovery: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "User enters the OTP to activate account. Forgot password requests similarly dispatch a 6-digit verification code.", font: "Calibri" })
                ]
            }),

            // Section 7: Subscription & Payment Processing
            new Paragraph({
                text: "7. Advisory Subscription & Payment Processing",
                heading: HeadingLevel.HEADING_1,
                space: { before: 200, after: 100 }
            }),
            new Paragraph({
                space: { after: 60 },
                children: [
                    new TextRun({ text: "• Advisory Plan Tier Selection: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "New investors select initial capital deposit tiers ($10,000 Starter Vault, $25,000 Growth Vault, $100,000 Institutional).", font: "Calibri" })
                ]
            }),
            new Paragraph({
                space: { after: 250 },
                children: [
                    new TextRun({ text: "• Deposit & Transaction Logging: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "Processes payment methods securely and logs transaction IDs (e.g. TXN-902418) for investor auditing.", font: "Calibri" })
                ]
            }),

            // Section 8: Investor Dashboard Operations
            new Paragraph({
                text: "8. Investor Dashboard & Wealth Management Operations",
                heading: HeadingLevel.HEADING_1,
                space: { before: 200, after: 100 }
            }),
            new Paragraph({
                space: { after: 60 },
                children: [
                    new TextRun({ text: "• Portfolio Overview & Asset Allocation: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "Displays total net portfolio value, cumulative return percentages, risk tolerance grades, and asset distribution charts.", font: "Calibri" })
                ]
            }),
            new Paragraph({
                space: { after: 60 },
                children: [
                    new TextRun({ text: "• AI Quantitative Rebalancing: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "Monitors allocation drift across asset classes and provides one-click AI execution to restore target risk balance.", font: "Calibri" })
                ]
            }),
            new Paragraph({
                space: { after: 250 },
                children: [
                    new TextRun({ text: "• Automated Tax-Loss Harvesting (TLH): ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "Identifies capital losses to offset taxable capital gains while maintaining long-term market exposure.", font: "Calibri" })
                ]
            }),

            // Section 9: Senior Advisor / Admin Dashboard Operations
            new Paragraph({
                text: "9. Senior Advisor & Admin Dashboard Operations",
                heading: HeadingLevel.HEADING_1,
                space: { before: 200, after: 100 }
            }),
            new Paragraph({
                space: { after: 60 },
                children: [
                    new TextRun({ text: "• Client Roster Management: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "Advisor accesses client portfolios, risk profiles, total assets under management (AUM), and drift indicators.", font: "Calibri" })
                ]
            }),
            new Paragraph({
                space: { after: 60 },
                children: [
                    new TextRun({ text: "• Custom Proposal Dispatch: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "Advisors construct customized asset allocation proposals (Equities %, Bonds %, Cash %, Gold %) and dispatch them directly to investor dashboards for client approval.", font: "Calibri" })
                ]
            }),
            new Paragraph({
                space: { after: 250 },
                children: [
                    new TextRun({ text: "• Macroeconomic Signal Dispatcher: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "Advisors simulate market scenarios (Inflation Spike, Recession Risk, Crypto Bull Run) to evaluate bulk portfolio adjustments.", font: "Calibri" })
                ]
            }),

            // Section 10: Regulatory Compliance & Security Standards
            new Paragraph({
                text: "10. Regulatory Compliance & Security Standards",
                heading: HeadingLevel.HEADING_1,
                space: { before: 200, after: 100 }
            }),
            new Paragraph({
                space: { after: 60 },
                children: [
                    new TextRun({ text: "• Strict Single-Window Policy: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "All website features MUST operate within a single primary browser window. Secondary popups (window.open) or external tabs are strictly prohibited.", font: "Calibri" })
                ]
            }),
            new Paragraph({
                space: { after: 60 },
                children: [
                    new TextRun({ text: "• Fiduciary Credentials: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "Public footers and advisory forms MUST display registered fiduciary credentials (SEBI Reg: INA000098765 | SEC RIA #801-123456).", font: "Calibri" })
                ]
            }),
            new Paragraph({
                space: { after: 250 },
                children: [
                    new TextRun({ text: "• Data Security: ", bold: true, font: "Calibri" }),
                    new TextRun({ text: "Passwords MUST be encrypted using bcrypt (10 rounds). Email transmissions MUST use TLS-encrypted SMTP channels.", font: "Calibri" })
                ]
            }),

            // Section 11: Operational QA Sign-Off Checklist Table
            new Paragraph({
                text: "11. Operational Sign-Off & System Audit Checklist",
                heading: HeadingLevel.HEADING_1,
                space: { before: 200, after: 120 }
            }),
            new Table({
                width: { size: 9200, type: WidthType.DXA },
                columnWidths: [2600, 4800, 1800],
                rows: [
                    new TableRow({
                        tableHeader: true,
                        cantSplit: true,
                        children: [
                            createHeaderCell("System Module", 2600),
                            createHeaderCell("Standard Operational Requirement", 4800),
                            createHeaderCell("Status", 1800)
                        ]
                    }),
                    new TableRow({
                        cantSplit: true,
                        children: [
                            createBodyCell("Lead Capture Form", 2600, true),
                            createBodyCell("Form captures Name, Email, Phone, Budget, Interest, Note; saves to database & local CRM.", 4800),
                            createBodyCell("PASSED (100%)", 1800, true)
                        ]
                    }),
                    new TableRow({
                        cantSplit: true,
                        children: [
                            createBodyCell("Advisor CRM Tab", 2600, true),
                            createBodyCell("Advisor dashboard displays incoming leads with search, filter, and status controls.", 4800),
                            createBodyCell("PASSED (100%)", 1800, true)
                        ]
                    }),
                    new TableRow({
                        cantSplit: true,
                        children: [
                            createBodyCell("6-Digit OTP Email", 2600, true),
                            createBodyCell("Signup & password reset trigger 6-digit OTP email dispatch with 5-minute expiry.", 4800),
                            createBodyCell("PASSED (100%)", 1800, true)
                        ]
                    }),
                    new TableRow({
                        cantSplit: true,
                        children: [
                            createBodyCell("Single-Window UX", 2600, true),
                            createBodyCell("Zero popups or secondary tabs triggered across all user flows.", 4800),
                            createBodyCell("PASSED (100%)", 1800, true)
                        ]
                    }),
                    new TableRow({
                        cantSplit: true,
                        children: [
                            createBodyCell("SEBI / SEC Disclosures", 2600, true),
                            createBodyCell("Footer & lead forms display SEBI INA000098765 and SEC RIA #801-123456 credentials.", 4800),
                            createBodyCell("PASSED (100%)", 1800, true)
                        ]
                    })
                ]
            })
        ]
    }]
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(outputDocxPath, buffer);
    console.log(`Strict Monochrome SOP Word Document created successfully at: ${outputDocxPath}`);
}).catch(err => console.error("Error creating SOP docx:", err));
