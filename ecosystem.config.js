module.exports = {
  apps: [
    {
      name: "PortfolioClient",
      script: "./client/.output/server/index.mjs",
      port: 5551,
    },
    {
      name: "PortfolioApi",
      script: "npm",
      args: "run start:prod",
      cwd: "./api/", // Путь к приложению app2
    },
    {
      name: "PortfolioBot",
      script: "npm",
      args: "run start",
      cwd: "./bot/", // Путь к приложению app3
    },
  ],
};
