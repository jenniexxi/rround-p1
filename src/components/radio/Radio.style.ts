import styled from 'styled-components';

export const RadioContainer = styled.div`
  display: flex;
`;

export const RadioInput = styled.input`
  margin: 0;
  padding: 0;
  outline: 0 none;
  border: none;
  box-shadow: none;
  -webkit-appearance: none;
  appearance: none;
  width: 2.4rem;
  height: 2.4rem;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOoSURBVHgB1ZrdUdtAEID3zpmJnhLrhbGBmcgVABVEVAB0ABXgVIDpACqIUwGhAkwFOBWgB7A9vEh5isiMdNm1JEeWZVnSCiN/MxYjcci7t3t3+4OACnh8tJuaBsdKyT0AZQgB+/i4GX4iLPooJYZCiCGAd99u6xYwEVCSUOguvuIr3ppQAqUAlZFXHGUKKxAT/BzmZ5iJ6AP4l0UVKaTAeGz3qhc8iSIlenlH51IABTfQd29C314HFipymMcactUAFP4U9XxYo/AETdjD87N9vGpgpgKhy3yHN3WZdHDCmlKKm0CGjHHLfhEKfwG1YPm6SFWATEfaQ62Qp+32px/JpwsK0IIln4d3cJss8MxwhFAHyYWdsgbEHdRMeILWBO2EyedzCoQLxoCaQjvhePx7bl3OXCh0nUeoOeRKr6+q0+noDt3HLCBrsuNkQ66kafJ8dk+XTZn9iLgVIguYsEHErSCDB+IcqmOA7+sq9dFot5uCPp6nDnDeziDICSpCmXQVFboP7tOi12p9vs4aNBrZXRxH6429Vbuu0skCJvBxGg11uEp4Yntbv6Kx9DfARNMaRxIzoj1gQjO/taUP846nsUqpS2CC79iXdAEeVp6ZT0KWwB8DYKEMciEDWMgelAQt9xMY0MnMVsDzvF9QEqX8W2CA50ETdyFHAQPaJoEB9/tXppR1hxRgbWej0Z8vUJKnJ5udZ7MVkPLvysR7GY0Gu1BgSaqOAQPchksrUEHObUnMfS3gYVJ4AAWZTKZ/YwADqrOiBfzS2+B/xEURf355sffxy9n5BxWJJdY5WYdJ8KJpDecujyVo5j2vqrzbuw8TGodeaEI1WHQ60wG3uxvERxTxYsx1FK4XEyoAJ23YajUPPoS3gyi+rgADq8z9RkPQxMweovBQJdiLoFgqOMg0zadgjB3erhfvnq5TBXSdMnxxBRuD6EcFrlkcY9t203WnmVntilqLqE6kwCwW2hwriF68vLgQSU4mzgOut3X2AopgYfTbiT9YiEZxtziBei5oh7o2yYcLCgTmUd+gZvi+OktrOaXmAziwT74GtUH0dnb01IghM5sKKsGqB+8KLdrPSysYK9PBsFvzHn0y9HnZTevKxMndZg0bHwasgaCDr07ytFkLNrrf3KWmZ1GWyyQpXFEIrEG9BHUK1TEV3HX966hxkZfSJZFAETCpss04+AYUCZcRPIJV04mIlKF/t0HfJWUMmF8vJJxDMbzvC4syKdf1bssKHecfxuN9cZdeHCoAAAAASUVORK5CYII=')
    center / cover no-repeat;
  &:checked {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAO4SURBVHgB1ZphVtpAEMf/u4Hv9ATFExRPUDyBeAM9QaOCvr5+MHzqQ6TGE2hPYD0BegLxBPUIvNd+aUmyzoQYMWBIsjGE33uRJG9ddnZmdmdmEcgB81zVqhO0lMAnoVCHQIPua1B0BQjgUdFFtyMpMBIG7nr74hGaCGSEB204MKmDz/TYRDZYGFtHmNQChAMX+DI7w7pQf1fSQDetIKkEOOwrK++BR1EeuoNjYSVtn0iA43NVdx1c020DBcD+IivYSqINuazBwanadV3co6DBM+TsPGH3hz3VWtY2VgA2GXKyy/c0mRhqQuKahLDiGr1pQr69AycoAXF+sVAAVh1LjxJB+8ruoC1+Rt/PCeA7LNv8aswmjrFRwWbUsed8wHMwLOHgmVqwEr7ilQBs97wCoLw02n31yi9DEwrW+t8oP2Ongg17X4z5IdSA55ZjxUlAreJQNBDga2CNZv+ZUAu+BrxJ5mhyVYRa8AVQ4kUlOXBLAZ9JfdbPOkLwRTnCpqewp5SfD+RFk/+IHM1nTAO1+kfiIq7RQV+ZcrrDay/VZEYfZE7mw4PfWjZ45kdH2NyW/weaGC62JaeB0CSY+VHS9tzWA7rQhL63wT6gFSazXSeZ+SisCfq4hQacf1O0rLnzSljICDn7L2hAWmxI3dBB/sMDMiInuIEGNAG1pRnZMvrfktt+lN5X7bKKvgCrhgXQWs4Oz9RHZKRzqrTzbHZiLQGkh6WJdwzaK6CkcC6zDfudCA0BhF4ETE78KHOIT5rtnjKREkpMzBySJypNquzLYIjESRp77pxTW6Gff5D2R3JS1dtMAmrU2TCJJvyZd/PJu90J7kTQ6RDIJyfgsiDZpkW1nIfn+Mj8rurVKrbJXFt5fQ9NwOjsSGxW/AdJMYmXT8ds1zTQK5aEJublvUKuKAmOpaYJjSPBwZh2eFskbD786QvgZ/iBROsAa9gOwpAwlFgnLVDlMMwlQgHWSAuWPRMEztVGyfEKPQtIA2+6gyOxMftuLhp1HOygnKY0JtPZir6cE4DVQ7vzPkoG7St79oL8YWE+QBvQlU6q+A5YdMCxMGKIPeRrD6gS7K1cEIuKY29WMJaeUlLC0iKTugQKPzMYU3xlLjqVmSXRMSvHMoaBIcU4dRQBxTmOix07Qc6c6qC7AJPi1c+OM5ko6X9qMNXGCWljF/nhD9z5iwu7K1It4dl/7EGCSANNOa1sZ934bvnKMvBnMgswSyiMojqrRIOrfZF0cewXD8i2/UTcwOj/H9xkHfQsT+cBfBWyeJweAAAAAElFTkSuQmCC')
      center / cover no-repeat;
  }

  & + label {
    margin-left: 8px;
  }
`;

export const RadioLabel = styled.label`
  font-size: 16px;
  line-height: 1;
  vertical-align: middle;
`;