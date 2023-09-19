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
    sign: "KzpejLV9r9ZP92d5t0q7heMHIZCDJ3+Wk+8ubG/LsqcFYYGtJddkAJVz9oOOrhIopsc/1Jg12EQ9KdODOX3YIyPVZGr/ksSNtqrKd9gTT4Yqm4QudumosSynUHWkAKjCbOG0S/ZWZafe/SstO34Zf7EKHCfEDJLDDKpP6JPKNSg=",
    token:
      "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pgo8c3NvIHZlcnNpb249IjIuMCI+CiAgICA8aWQgc3JjPSJDTj13c2FhaG9tbywgTz1BRklQLCBDPUFSLCBTRVJJQUxOVU1CRVI9Q1VJVCAzMzY5MzQ1MDIzOSIgZHN0PSJDTj13c2ZlLCBPPUFGSVAsIEM9QVIiIHVuaXF1ZV9pZD0iMzk0OTc2MzA1NCIgZ2VuX3RpbWU9IjE2OTUxMzU0NjgiIGV4cF90aW1lPSIxNjk1MTc4NzI4Ii8+CiAgICA8b3BlcmF0aW9uIHR5cGU9ImxvZ2luIiB2YWx1ZT0iZ3JhbnRlZCI+CiAgICAgICAgPGxvZ2luIGVudGl0eT0iMzM2OTM0NTAyMzkiIHNlcnZpY2U9IndzZmUiIHVpZD0iU0VSSUFMTlVNQkVSPUNVSVQgMjA0MTEzOTU2NzgsIENOPXRlc3RpbmciIGF1dGhtZXRob2Q9ImNtcyIgcmVnbWV0aG9kPSIyMiI+CiAgICAgICAgICAgIDxyZWxhdGlvbnM+CiAgICAgICAgICAgICAgICA8cmVsYXRpb24ga2V5PSIyMDQxMTM5NTY3OCIgcmVsdHlwZT0iNCIvPgogICAgICAgICAgICA8L3JlbGF0aW9ucz4KICAgICAgICA8L2xvZ2luPgogICAgPC9vcGVyYXRpb24+Cjwvc3NvPgo=",
  },
};
