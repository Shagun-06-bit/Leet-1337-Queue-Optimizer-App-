SYSTEM ARCHITECTURE FLOWCHART:-


[ User (Customer) ]
        |
        | Scan QR Code
        v
[ Web App (Browser) ]
        |
        | Join Queue Request
        v
[ Backend API Server ]
(FastAPI / Node)
        |
        | Store / Update Queue Data
        v
[ Database ]
(Queue State, Counters,
 Service Time Stats)
        |
        | Real-Time Queue Updates
        v
[ Waiting Time Predictor ]
(Simple ML / Statistical Model)
        |
        | Estimated Wait Time
        v
[ Backend API Server ]
        |
        | Live Status + Notifications
        v
[ User Web Interface ]
("Your turn in 12 mins")






BUSINESS SIDE FLOW:-


[ Business Admin ]
        |
        | Register Business
        v
[ Admin Dashboard ]
        |
        | Create Counters
        | Generate QR Codes
        v
[ Printed QR at Counter ]





STAFF SIDE FLOW:-


[ Counter Staff ]
        |
        | Serve Next User
        v
[ Staff Dashboard ]
        |
        | Click "Next Served"
        v
[ Backend API ]
        |
        | Update Queue Progress
        v
[ Waiting Time Predictor ]
        |
        | Recalculate ETA
        v
[ Users Get Updated Status ]






ANALYTICS & OPTIMIZATION FLOW:-


[ Queue History Data ]
        |
        v
[ Analytics Engine ]
        |
        | Peak Hours
        | Avg Service Time
        | Queue Length Trends
        v
[ Admin Insights Dashboard ]





PRIVACY & SAFETY LAYER (ALWAYS ACTIVE):-


- No Login Required
- No Personal Data Stored
- QR-based Anonymous Access
- No Camera / No Face Data

