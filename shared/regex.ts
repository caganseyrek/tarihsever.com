class Regex {
  public static readonly HEADING_REGEX: RegExp = /^(#+)\s+(.*?)$/;
  public static readonly H1_HEADING_MATCH_REGEX: RegExp = /^#\s(.+)/;
  public static readonly H1_HEADING_REPLACE_REGEX: RegExp = /^#\s.+\n/;
}

export default Regex;
