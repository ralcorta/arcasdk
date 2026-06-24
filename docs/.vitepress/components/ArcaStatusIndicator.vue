<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { ARCA_STATUS_GIST_RAW_URL } from "../arca-status.config";
import {
  deriveOverallStatus,
  fetchStatusPayload,
  statusLabel,
  type ServiceStatus,
} from "../utils/arca-status";

const visible = ref(false);
const loading = ref(true);
const overallStatus = ref<ServiceStatus | "unknown">("unknown");

const indicatorLabel = computed(() => statusLabel(overallStatus.value as ServiceStatus));

async function loadStatus() {
  if (!ARCA_STATUS_GIST_RAW_URL) {
    loading.value = false;
    return;
  }

  try {
    const payload = await fetchStatusPayload(ARCA_STATUS_GIST_RAW_URL);
    const services = payload.environments.production.services;

    overallStatus.value = deriveOverallStatus(services);
    visible.value = true;
  } catch {
    // Sin indicador hasta que haya datos publicados
  } finally {
    loading.value = false;
  }
}

onMounted(loadStatus);
</script>

<template>
  <a
    v-if="visible && !loading"
    href="/status"
    class="arca-indicator"
    :data-status="overallStatus"
    :title="indicatorLabel"
    aria-label="Ver estado de servicios ARCA"
  >
    <span class="arca-indicator__dot" aria-hidden="true" />
    <span class="arca-indicator__label">ARCA</span>
  </a>
</template>

<style scoped>
.arca-indicator {
  --status-ok: #34d399;
  --status-warn: #fbbf24;
  --status-down: #f87171;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-right: 0.35rem;
  padding: 0.2rem 0.55rem 0.2rem 0.45rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  font-size: 0.78rem;
  line-height: 1;
  color: var(--vp-c-text-2);
  text-decoration: none;
  user-select: none;
  transition: border-color 0.2s ease;
}

.arca-indicator:hover {
  border-color: var(--vp-c-brand-1);
}

.arca-indicator__dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--vp-c-text-3);
}

.arca-indicator[data-status="operational"] .arca-indicator__dot {
  background: var(--status-ok);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--status-ok) 25%, transparent);
}

.arca-indicator[data-status="degraded"] .arca-indicator__dot {
  background: var(--status-warn);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--status-warn) 25%, transparent);
}

.arca-indicator[data-status="down"] .arca-indicator__dot {
  background: var(--status-down);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--status-down) 25%, transparent);
}

.arca-indicator__label {
  font-weight: 600;
  letter-spacing: 0.02em;
}

@media (max-width: 768px) {
  .arca-indicator__label {
    display: none;
  }

  .arca-indicator {
    padding: 0.35rem;
    margin-right: 0.15rem;
  }
}
</style>
