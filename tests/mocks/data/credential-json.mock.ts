import moment from "moment";
import { ILoginCredentials } from "../../../src/types";

export const mockLoginCredentials: ILoginCredentials = {
  header: [
    {
      version: "1.0",
    },
    {
      source: "source",
      destination: "destination",
      uniqueid: "uniqueid",
      generationtime: moment().toISOString(),
      expirationtime: moment().add(1, "day").toISOString(),
    },
  ],
  credentials: {
    sign: "KzpejLV9r9ZP92d5t0q7heMHIZCDJ3-Wk-8ubG-LsqcFYYGtJddkAJVz9oOOrhIopsc-1Jg12EQ9KdKzpefU9neUoHISd/LmxvBWElZO+/vXMSKD7UmDVEPSnTgzl9IyNkasSNdxNPKi526aixLFB177+9bEtWZSstO34nDAxPNSg=",
    token:
      "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pgo8c3NvIHZlcnNpb249IjIuMCI+CiAgPGlkIHNyYz0iQ049d3NhYWhvbWJvLCBPPUFGSVAsIEM9QVIsIFNFUklBTE5VTUJFUj1DVUlUIDMzMjkzNTUwMjIxIiBkc3Q9IkNOPXdzZmUsIE89QUZJUCwgQz1BUiIgdWlkPSJTRVNJQU1OVUJFVj1DVUkgMjA0NDUxNTA1MTgsIENOTz10ZXNpbmciIGF1dGg9ImxvY2FsIiB2ZXJiPSJsb2dpbiI+CiAgICA8b3BlcmF0aW9uIHR5cGU9ImxvZ2luIiB2YWx1ZT0iZ3JhbnRlZCI+CiAgICAgIDxsb2dpbiBlbnRpdHk9InRlc3RpbmciIHZpcD0iZmFsc2UiIHVpZD0iU0VTSUFNTlVCRVY9Q1VJIDIwNDQ1MTUwNTE4LCBDTk89dGVzaW5nIiBhdXRoPSJsb2NhbCI+CiAgICAgICAgPHJvbGVzPgogICAgICAgICAgPHJvbGUga2V5PSIyMDQ0NTE1MDUxOCIvPgogICAgICAgIDwvcm9sZXM+CiAgICAgIDwvbG9naW4+CiAgICA8L29wZXJhdGlvbj4KICA8L2lkPgo8L3Nzbz4=",
  },
};
