import path from "node:path";

const root = process.cwd();

const port = Number(process.env.SERVER_PORT) || 3000;

export const config = {
  port,
  root,
  url: process.env.WEBSITE_URL || `http://127.0.0.1:${port}`,

  isDev: process.env.NODE_ENV === "development",
  isProd: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",

  paths: {
    views: path.join(root, "src", "views"),
    public: path.join(root, "src", "public"),
  },

  helmet: {}, // DEFAULTS ARE FINE FOR NOW: https://helmetjs.github.io/

  urlEncoded: { extended: true, limit: "10kb" },
  compression: {
    level: 9,
    memLevel: 9,
  },

  rateLimit: {
    statusCode: 429,
    message: "Take a break!", // "" for now
    options: {
      windowMs: 5 * 60 * 1000,
      limit: 250,
      standardHeaders: "draft-8",
      legacyHeaders: false,
      ipv6Subnet: 56,
      // store: FOR THE MVP THE DEFAULT IS FINE, LATER A DB TO SHARE STATE.
    },
  },

  cookie: {
    name: "auth_token",

    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  },

  helpers: {
    // USELESS / UN-USED FOR NOW
    universityFixedEmailDomain: "s{SID}@stu.najah.edu",
    slugLength: 8,
  },

  staticMaxAge: "12h",
  pepper: process.env.PASSWORD_PEPPER,
  from: process.env.SMTP_FROM || "smtp@azizjaber.me",
};

export const TURSO = {
  DB_URL: process.env.TURSO_DATABASE_URL,
  DB_TOKEN: process.env.TURSO_AUTH_TOKEN,
};

export const JWT = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE,
};

export const SMTP = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  pool: process.env.SMTP_POOL === "true",
  from: process.env.SMTP_FROM, // EXTRA
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};
