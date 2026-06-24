<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { ARCA_STATUS_GIST_RAW_URL } from "../arca-status.config";
import {
  deriveOverallStatus,
  formatUpdatedAt,
  fetchStatusPayload,
  StatusUnavailableError,
  statusLabel,
  type ServiceStatus,
  type StatusPayload,
} from "../lib/arca-status";

const loading = ref(true);
const isEmpty = ref(false);
const error = ref<string | null>(null);
const payload = ref<StatusPayload | null>(null);
const activeTab = ref<"production" | "homologation">("production");

const activeEnvironment = computed(() => {
  if (!payload.value) return null;
  return payload.value.environments[activeTab.value];
});

const summary = computed(() => {
  const env = activeEnvironment.value;
  if (!env) return null;

  const counts = { operational: 0, degraded: 0, down: 0 };
  for (const service of env.services) {
    counts[service.status] += 1;
  }

  return counts;
});

const overallStatus = computed<ServiceStatus | null>(() => {
  const env = activeEnvironment.value;
  if (!env) return null;
  return deriveOverallStatus(env.services);
});

async function loadStatus() {
  loading.value = true;
  isEmpty.value = false;
  error.value = null;

  if (!ARCA_STATUS_GIST_RAW_URL) {
    loading.value = false;
    isEmpty.value = true;
    return;
  }

  try {
    payload.value = await fetchStatusPayload(ARCA_STATUS_GIST_RAW_URL);
  } catch (cause) {
    payload.value = null;

    if (cause instanceof StatusUnavailableError) {
      isEmpty.value = true;
      return;
    }

    error.value =
      cause instanceof Error
        ? cause.message
        : "No se pudo cargar el estado de los servicios.";
  } finally {
    loading.value = false;
  }
}

onMounted(loadStatus);
</script>

<template>
  <section class="arca-dashboard" aria-live="polite">
    <header class="arca-dashboard__header">
      <div>
        <h1>Estado de servicios ARCA</h1>
        <p v-if="payload?.updatedAt" class="arca-dashboard__updated">
          Última verificación: {{ formatUpdatedAt(payload.updatedAt) }}
        </p>
      </div>
      <button type="button" class="arca-dashboard__refresh" @click="loadStatus">
        Actualizar
      </button>
    </header>

    <div v-if="loading" class="arca-dashboard__message">Cargando…</div>

    <div
      v-else-if="isEmpty"
      class="arca-dashboard__message arca-dashboard__message--empty"
    >
      Aún no hay información disponible. El estado se publicará cuando el
      monitoreo automático comience a ejecutarse.
    </div>

    <div
      v-else-if="error"
      class="arca-dashboard__message arca-dashboard__message--error"
    >
      {{ error }}
    </div>

    <template v-else-if="payload && activeEnvironment">
      <div class="arca-dashboard__toolbar">
        <div class="arca-dashboard__tabs" role="tablist">
          <button
            type="button"
            role="tab"
            :aria-selected="activeTab === 'production'"
            :class="{ active: activeTab === 'production' }"
            @click="activeTab = 'production'"
          >
            Producción
          </button>
          <button
            type="button"
            role="tab"
            :aria-selected="activeTab === 'homologation'"
            :class="{ active: activeTab === 'homologation' }"
            @click="activeTab = 'homologation'"
          >
            Homologación
          </button>
        </div>

        <span
          v-if="overallStatus"
          class="arca-dashboard__overall"
          :data-status="overallStatus"
        >
          {{ statusLabel(overallStatus) }}
        </span>
      </div>

      <div v-if="summary" class="arca-dashboard__summary">
        <span class="pill pill--ok">{{ summary.operational }} operativos</span>
        <span v-if="summary.degraded" class="pill pill--warn">
          {{ summary.degraded }} degradados
        </span>
        <span v-if="summary.down" class="pill pill--down">
          {{ summary.down }} caídos
        </span>
      </div>

      <div class="arca-dashboard__grid">
        <article
          v-for="service in activeEnvironment.services"
          :key="service.id"
          class="arca-dashboard__card"
          :data-status="service.status"
        >
          <div class="arca-dashboard__card-head">
            <h2>{{ service.name }}</h2>
            <span class="arca-dashboard__badge" :data-status="service.status">
              {{ statusLabel(service.status) }}
            </span>
          </div>

          <dl class="arca-dashboard__servers">
            <div>
              <dt>App</dt>
              <dd>{{ service.servers.app ?? "—" }}</dd>
            </div>
            <div>
              <dt>DB</dt>
              <dd>{{ service.servers.db ?? "—" }}</dd>
            </div>
            <div>
              <dt>Auth</dt>
              <dd>{{ service.servers.auth ?? "—" }}</dd>
            </div>
          </dl>

          <p class="arca-dashboard__meta">
            {{ service.latencyMs }} ms
            <span v-if="service.error"> · {{ service.error }}</span>
          </p>
        </article>
      </div>
    </template>
  </section>
</template>

<style scoped>
.arca-dashboard {
  --status-ok: #34d399;
  --status-warn: #fbbf24;
  --status-down: #f87171;
  max-width: 960px;
  margin: 0 auto;
  padding: 0.5rem 0 2rem;
}

.arca-dashboard__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.arca-dashboard h1 {
  margin: 0;
  font-size: 1.75rem;
  line-height: 1.2;
}

.arca-dashboard__updated {
  margin: 0.45rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.92rem;
}

.arca-dashboard__refresh {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border-radius: 999px;
  padding: 0.45rem 0.9rem;
  cursor: pointer;
}

.arca-dashboard__refresh:hover {
  border-color: var(--vp-c-brand-1);
}

.arca-dashboard__message {
  padding: 1rem 1.1rem;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}

.arca-dashboard__message--error {
  border-color: color-mix(in srgb, var(--status-down) 45%, transparent);
}

.arca-dashboard__message--empty {
  color: var(--vp-c-text-3);
  border-style: dashed;
}

.arca-dashboard__toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.arca-dashboard__tabs {
  display: inline-flex;
  padding: 0.2rem;
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}

.arca-dashboard__tabs button {
  border: 0;
  background: transparent;
  color: var(--vp-c-text-2);
  border-radius: 999px;
  padding: 0.4rem 0.85rem;
  cursor: pointer;
}

.arca-dashboard__tabs button.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.arca-dashboard__overall {
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 999px;
  padding: 0.25rem 0.65rem;
}

.arca-dashboard__overall[data-status="operational"] {
  color: var(--status-ok);
  background: color-mix(in srgb, var(--status-ok) 14%, transparent);
}

.arca-dashboard__overall[data-status="degraded"] {
  color: var(--status-warn);
  background: color-mix(in srgb, var(--status-warn) 14%, transparent);
}

.arca-dashboard__overall[data-status="down"] {
  color: var(--status-down);
  background: color-mix(in srgb, var(--status-down) 14%, transparent);
}

.arca-dashboard__summary {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.pill {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.25rem 0.65rem;
  font-size: 0.82rem;
  border: 1px solid var(--vp-c-divider);
}

.pill--ok {
  color: var(--status-ok);
  border-color: color-mix(in srgb, var(--status-ok) 35%, transparent);
}

.pill--warn {
  color: var(--status-warn);
  border-color: color-mix(in srgb, var(--status-warn) 35%, transparent);
}

.pill--down {
  color: var(--status-down);
  border-color: color-mix(in srgb, var(--status-down) 35%, transparent);
}

.arca-dashboard__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 0.85rem;
}

.arca-dashboard__card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 0.9rem 1rem;
  background: var(--vp-c-bg-soft);
}

.arca-dashboard__card[data-status="operational"] {
  border-color: color-mix(in srgb, var(--status-ok) 30%, var(--vp-c-divider));
}

.arca-dashboard__card[data-status="degraded"] {
  border-color: color-mix(in srgb, var(--status-warn) 30%, var(--vp-c-divider));
}

.arca-dashboard__card[data-status="down"] {
  border-color: color-mix(in srgb, var(--status-down) 30%, var(--vp-c-divider));
}

.arca-dashboard__card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.arca-dashboard__card h2 {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.35;
  font-weight: 600;
}

.arca-dashboard__badge {
  font-size: 0.72rem;
  border-radius: 999px;
  padding: 0.15rem 0.5rem;
  white-space: nowrap;
}

.arca-dashboard__badge[data-status="operational"] {
  color: var(--status-ok);
  background: color-mix(in srgb, var(--status-ok) 14%, transparent);
}

.arca-dashboard__badge[data-status="degraded"] {
  color: var(--status-warn);
  background: color-mix(in srgb, var(--status-warn) 14%, transparent);
}

.arca-dashboard__badge[data-status="down"] {
  color: var(--status-down);
  background: color-mix(in srgb, var(--status-down) 14%, transparent);
}

.arca-dashboard__servers {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem;
  margin: 0;
}

.arca-dashboard__servers dt {
  margin: 0;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}

.arca-dashboard__servers dd {
  margin: 0.1rem 0 0;
  font-size: 0.85rem;
  font-family: var(--vp-font-family-mono);
}

.arca-dashboard__meta {
  margin: 0.7rem 0 0;
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}
</style>
