/* eslint-disable no-console */
class Logger {
  private static readonly LOG_BASE: string = " Tarihsever > ";

  private static readonly LOG_INFO_PREFIX: string = "[INFO]" + this.LOG_BASE;
  private static readonly LOG_WARNING_PREFIX: string = "[WARNING]" + this.LOG_BASE;
  private static readonly LOG_ERROR_PREFIX: string = "[ERROR]" + this.LOG_BASE;

  public static info(message: string) {
    console.info(this.LOG_INFO_PREFIX + message);
  }

  public static warning(message: string) {
    console.warn(this.LOG_WARNING_PREFIX + message);
  }

  public static error(message: string, error?: Error) {
    console.error(this.LOG_ERROR_PREFIX + message + (error ? error.stack : ""));
  }
}

export { Logger };
