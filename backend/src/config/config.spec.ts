describe("parser", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  it("should parse environment", () => {
    const parseEnv = require("./parser").parseEnv;

    process.env.NODE_ENV = "prod";
    process.env.TEST = "yes";

    const envFile = "";

    const result = parseEnv({ envFile });

    expect(result.TEST).toEqual(process.env.TEST);
  });

  it("should parse .env file without NODE_ENV flag", () => {
    const parseEnv = require("./parser").parseEnv;

    delete process.env.NODE_ENV;
    process.env.TEST = "yes";

    const envFile = ".env";

    const result = parseEnv({ envFile });

    expect(result.TEST).toBeUndefined();
  });

  it("should parse .env file without match pattern 'prod' ", () => {
    const parseEnv = require("./parser").parseEnv;

    process.env.TEST = "yes";

    const envFile = ".env";

    const result = parseEnv({ envFile });

    expect(result.TEST).toBeUndefined();
  });

  it("should throw error no match pattern 'prod' and invalid path to file", () => {
    const parseEnv = require("./parser").parseEnv;
    const ERROR_SOURCE_DOESNT_FOUND =
      require("./parser").ERROR_SOURCE_DOESNT_FOUND;

    delete process.env.NODE_ENV;

    const envFile = ".envasion";

    expect(() => parseEnv({ envFile })).toThrow(ERROR_SOURCE_DOESNT_FOUND);
  });
});

describe("config", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("should export object with correct keys", () => {
    const config = require("./config").config;

    expect(config).toMatchObject({
      env: expect.any(String),
      versionBuild: expect.any(String),
      apolloDebug: expect.any(Boolean),
      mainInfo: {
        frontDomain: expect.any(String),
      },
      queue: {
        port: expect.any(Number),
        domain: expect.any(String),
        username: expect.any(String),
        password: expect.any(String),
      },
      session: {
        port: expect.any(Number),
        domain: expect.any(String),
        username: expect.any(String),
        password: expect.any(String),
      },
      logs: {
        lvl: expect.any(String),
        format: expect.any(String),
      },
      elastic: {
        domain: expect.any(String),
        port: expect.any(Number),
      },
      mail: {
        confirmationURI: expect.any(String),
        confirmationURL: expect.any(String),
        confirmTemplate: expect.any(String),
        deleteCompanyURI: expect.any(String),
        deleteCompanyURL: expect.any(String),
        deleteCompanyTemplate: expect.any(String),
        forceDeleteCompanyTemplate: expect.any(String),
        inviteNotificationTemplate: expect.any(String),
        inviteUserUrl: expect.any(String),
        inviteUserTemplate: expect.any(String),
        recoveryPasswordUrl: expect.any(String),
        recoveryPasswordTemplate: expect.any(String),
        changePasswordUrl: expect.any(String),
        changePasswordTemplate: expect.any(String),
        changeEmailValidateURI: expect.any(String),
        changeEmailActivateURI: expect.any(String),
        inviteEmployeeURI: expect.any(String),
        templates: expect.any(String),
        mailgun: {
          apiKey: expect.any(String),
          domain: expect.any(String),
        },
        nodeMailer: {
          protocol: expect.any(String),
          domain: expect.any(String),
          smtpPort: expect.any(Number),
          httpPort: expect.any(Number),
        },
        mailChannelSender: expect.any(String),
      },
      scorm: {
        port: expect.any(Number),
        domain: expect.any(String),
        projectSrc: expect.any(String),
        projectDist: expect.any(String),
        buildDist: expect.any(String),
        buildSrc: expect.any(String),
        coreHost: expect.any(String),
        indexSrc: expect.any(String),
        indexDist: expect.any(String),
        filesDist: expect.any(String),
        ziperSrc: expect.any(String),
      },
      schema: {
        port: expect.any(Number),
        domain: expect.any(String),
      },
      storage: {
        port: expect.any(Number),
        domain: expect.any(String),
        type: expect.any(String),
        filesRootFolder: expect.any(String),
        endpoint: expect.any(String),
        region: expect.any(String),
        accessKey: expect.any(String),
        secretAccessKey: expect.any(String),
        bucket: expect.any(String),
      },
      core: {
        port: expect.any(Number),
        domain: expect.any(String),
      },
      auth: {
        domain: expect.any(String),
        port: expect.any(Number),
      },
      announcer: {
        port: expect.any(Number),
        commandToken: expect.any(String),
      },
      health: {
        domain: expect.any(String),
        port: expect.any(Number),
      },
      postgres: {
        config: {
          domain: expect.any(String),
          user: expect.any(String),
          database: expect.any(String),
          password: expect.any(String),
          port: expect.any(Number),
          certificate: expect.any(String),
        },
        pgadmin: {
          defaultEmail: expect.any(String),
          defaultPassword: expect.any(String),
          port: expect.any(Number),
        },
      },
      redis: {
        username: expect.any(String),
        password: expect.any(String),
        domain: expect.any(String),
        port: expect.any(Number),
        tokenExpireHr: expect.any(Number),
        tokenDeleteCompanyExpireHr: expect.any(Number),
        tokenInviteUserExpireHr: expect.any(Number),
        tokenRecoveryPasswordExpireHr: expect.any(Number),
      },
    });
  });
});
