import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import ArcaStatusIndicator from "../components/ArcaStatusIndicator.vue";
import ArcaServiceStatusDashboard from "../components/ArcaServiceStatusDashboard.vue";
import "./style.css";
import "./home.css";

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "nav-bar-content-before": () => h(ArcaStatusIndicator),
    });
  },
  enhanceApp({ app }) {
    app.component("ArcaServiceStatusDashboard", ArcaServiceStatusDashboard);
  },
};
