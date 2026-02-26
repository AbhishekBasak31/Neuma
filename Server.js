import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import DB_Connection from "./src/DB/DB.js";
import jwt from "jsonwebtoken";
import { User } from "./src/Models/Global/User.js";

// GraphQL Imports
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import { typeDefs } from './src/GraphQL/TypeDef/TypeDef.js';
import { resolvers } from './src/GraphQL/Resolver/Resolver.js';

// Auth & Route Imports
import { authenticate } from "./src/Middleware/AuthMiddlewares.js";
import UploadRouter from "./src/Routers/Global/Upload.js";

const app = express();
const PORT = process.env.PORT || 7000;

// Middleware
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({
  origin: ["http://localhost:5173", "https://xoloerp.com", "https://fingertip.co.in"],
  credentials: true,
}));

// ==========================================
// 1. UNIVERSAL UPLOAD ROUTE (REST)
// ==========================================
app.use("/api/v1/upload", UploadRouter);

// ==========================================
// 2. GRAPHQL SERVER SETUP
// ==========================================
const startServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  // The single GraphQL endpoint. 
  app.use(
    '/graphql',
    cors({
      origin: ["http://localhost:5173", "https://xoloerp.com", "https://fingertip.co.in"],
      credentials: true,
    }),
    express.json(),
    // ❌ REMOVED: Your blocking 'authenticate' middleware is gone from here!
    
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => {
        let user = null; // Default to Guest

        try {
          // Look for the token in cookies or headers
          const token = req.cookies.AccessToken || req.headers.authorization?.split(' ')[1];
          
          if (token) {
            // If they have a token, verify it and fetch the user
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const foundUser = await User.findById(decoded.id);
            
            if (foundUser) {
              // Attach the user object (They are now VIP!)
              user = { id: foundUser._id, email: foundUser.email };
            }
          }
        } catch (err) {
          // If the token is expired or invalid, we DO NOT throw an error.
          // We just quietly let them remain a Guest (user = null).
          console.warn("Soft Auth: Invalid token, proceeding as Guest.",err);
        }

        // Pass the user, req, and res down to the resolvers
        return { user, req, res }; 
      },
    })
  );
  // ==========================================
  // 3. START DATABASE & SERVER
  // ==========================================
  DB_Connection(process.env.DB_URI, process.env.DB_NAME)
    .then(() => {
      app.listen(PORT, "0.0.0.0", () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`🚀 GraphQL Gateway ready at /graphql`);
      });
    })
    .catch((err) => {
      console.error("❌ Database connection failed:", err);
      process.exit(1);
    });
};

startServer();

// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import helmet from "helmet";
// import compression from "compression";
// import os from "os";

// import DB_Connection from "./src/DB/DB.js";

// // --- Import All Routers ---
// import UserRouter from "./src/Routers/Global/User.js";
// import SocialRouter from "./src/Routers/Global/Social.js";
// import FooterRouter from "./src/Routers/Global/Footer.js";
// import ContactRouter from "./src/Routers/Global/Contact.js";
// import EnquiryRouter from "./src/Routers/Global/Enquiry.js";
// import ContactDetailsRouter from "./src/Routers/Global/ContactDetails.js";

// import HomeBannerRouter from "./src/Routers/Homepage/Banner.js";
// import HomeAboutRouter from "./src/Routers/Homepage/About.js";
// import QuickLinkRouter from "./src/Routers/Global/QuickLinks.js";

// import EventRouter from "./src/Routers/Global/Event.js";
// import EventSecRouter from "./src/Routers/Global/EventSec.js";
// import NewsRouter from "./src/Routers/Global/News.js";
// import NewsSecRouter from "./src/Routers/Homepage/NewsSec.js";
// import FeatureSecRouter from "./src/Routers/Homepage/Features.js";

// import ReviewSectionRouter from "./src/Routers/Homepage/ReviewSec.js";
// import WhyChooseUsRouter from "./src/Routers/Homepage/WhyChooseUs.js";
// import ServiceSecRouter from "./src/Routers/Homepage/Service.js";
// import PackageRouter from "./src/Routers/Global/Package.js";
// import HomeDashRouter from "./src/Routers/Homepage/Dashboards.js";
// import FocusSecRouter from "./src/Routers/Homepage/Focus.js";
// import StatisticSecRouter from "./src/Routers/Homepage/Statistic.js";
// import HowitWorkSecRouter from "./src/Routers/Homepage/Howitwork.js";
// import ToolsSectionRouter from "./src/Routers/Homepage/Tools.js";
// import ClientSecRouter from "./src/Routers/Global/Clients.js";
// import IndustrialSecRouter from "./src/Routers/Global/Industrial.js";
// import FaqSecRouter from "./src/Routers/Global/Faq.js";
// import BlogSecRouter from "./src/Routers/Global/Blogs.js";

// import AboutPagerouter from "./src/Routers/AboutPage/AboutPage.js";
// import WhyChooseUsPageRouter from "./src/Routers/AboutPage/WhyChooseUs.js";
// import AskXoloPageRouter from "./src/Routers/AboutPage/AskXolo.js";
// import RefundPolicyRouter from "./src/Routers/Refund/Refund.js";
// import TermsRouter from "./src/Routers/TermsandCondition/TermsandCondition.js";
// import MetaRouter from "./src/Routers/Global/meta.routes.js";
// import AffiliateRouter from "./src/Routers/Affiliationpage/Affiliationpage.js";




// const app = express();
// const PORT = process.env.PORT || 7000;


// /* -------------------------------------------------------
//    GET LOCAL NETWORK IP (for dev logging only)
// ------------------------------------------------------- */
// function getLocalIP() {
//   try {
//     const nets = os.networkInterfaces();
//     for (const name in nets) {
//       for (const iface of nets[name]) {
//         if ((iface.family === "IPv4" || iface.family === 4) && !iface.internal) {
//           return iface.address;
//         }
//       }
//     }
//   } catch (err) {
//     console.warn("Local IP error:", err);
//   }
//   return "127.0.0.1";
// }

// const localIP = getLocalIP();

// /* -------------------------------------------------------
//    SECURITY & PERFORMANCE MIDDLEWARE
// ------------------------------------------------------- */
// app.use(helmet({ contentSecurityPolicy: false }));
// app.use(compression());
// app.use(cookieParser());

// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));

// /* -------------------------------------------------------
//    CORS CONFIG (FINAL & CORRECT)
// ------------------------------------------------------- */

// // IMPORTANT:
// // Frontend runs on https://fingertip.co.in/cdautomation
// // Browser Origin = https://fingertip.co.in (NO PATH)

// const allowedOrigins = new Set([
//   "http://localhost:5173",
//   "http://localhost:5174",
//   "http://localhost:8080",
//   "http://localhost:8086",
//   `http://${localIP}:5173`,
//   `http://${localIP}:5174`,
//   `http://${localIP}:8080`,
//   `http://${localIP}:8086`,
//   "https://fingertip.co.in",
//   "https://xoloerp.com" // ✅ PRODUCTION ORIGIN
// ]);

// // Optional env-based origin (safe)
// if (process.env.FRONTEND_URL) {
//   try {
//     const url = new URL(process.env.FRONTEND_URL);
//     allowedOrigins.add(url.origin);
//   } catch {
//     allowedOrigins.add(process.env.FRONTEND_URL);
//   }
// }

// console.log("🌐 Allowed Origins:", [...allowedOrigins]);

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // allow Postman / curl / server-to-server
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.has(origin)) {
//         return callback(null, true);
//       }

//       console.warn("❌ Blocked CORS Origin:", origin);
//       return callback(new Error("CORS: Origin not allowed"));
//     },
//     credentials: true,
//   })
// );

// /* -------------------------------------------------------
//    REQUEST DEBUG (SAFE)
// ------------------------------------------------------- */
// app.use((req, res, next) => {
//   console.log("→", req.method, req.originalUrl);
//   console.log("  Origin:", req.headers.origin || "(none)");
//   next();
// });

// /* -------------------------------------------------------
//    HEALTH CHECK
// ------------------------------------------------------- */
// app.get("/api/health", (req, res) => {
//   res.json({
//     ok: true,
//     uptime: process.uptime(),
//     environment: process.env.NODE_ENV || "production",
//   });
// });

// /* -------------------------------------------------------
//    API ROUTES
// ------------------------------------------------------- */
// app.use("/api/v1/user", UserRouter);
// app.use("/api/v1/contact", ContactRouter);
// app.use("/api/v1/enquiry", EnquiryRouter);
// app.use("/api/v1/footer", FooterRouter);
// app.use("/api/v1/social", SocialRouter);
// app.use("/api/v1/contactdetail", ContactDetailsRouter);
// app.use("/api/v1/reviewsec", ReviewSectionRouter);
// app.use("/api/v1/package",PackageRouter);
// app.use("/api/v1/quicklink", QuickLinkRouter);
// app.use("/api/v1/meta", MetaRouter);

// // Home page
// app.use("/api/v1/home/banner", HomeBannerRouter);
// app.use("/api/v1/home/about", HomeAboutRouter);
// app.use("/api/v1/home/featuresec", FeatureSecRouter);
// app.use("/api/v1/home/wcu", WhyChooseUsRouter);

// app.use("/api/v1/home/servicesec",ServiceSecRouter);
// app.use("/api/v1/home/dashboard",HomeDashRouter);
// app.use("/api/v1/home/focus",FocusSecRouter);
// app.use("/api/v1/home/statistic", StatisticSecRouter);
// app.use("/api/v1/home/workflow", HowitWorkSecRouter);
// app.use("/api/v1/tools", ToolsSectionRouter);
// app.use("/api/v1/clients", ClientSecRouter);
// app.use("/api/v1/industrial", IndustrialSecRouter);
// app.use("/api/v1/faq", FaqSecRouter);
// app.use("/api/v1/blogs", BlogSecRouter);

// // About page
// app.use("/api/v1/aboutpage", AboutPagerouter);
// app.use("/api/v1/about/whychooseus", WhyChooseUsPageRouter);
// app.use("/api/v1/about/askxolo", AskXoloPageRouter);
// app.use("/api/v1/refundpolicy", RefundPolicyRouter);
// app.use("/api/v1/terms", TermsRouter);

// //Feature page
// // app.use("/api/v1/featurepage", AboutPageRouter);

// app.use("/api/v1/affiliate", AffiliateRouter);


// //




// /* -------------------------------------------------------
//    DATABASE & SERVER START
// ------------------------------------------------------- */
// DB_Connection(process.env.DB_URI, process.env.DB_NAME)
//   .then(() => {
//     app.listen(PORT, "0.0.0.0", () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//       console.log(`🌐 Production API ready`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ Database connection failed:", err);
//     process.exit(1);
//   });
