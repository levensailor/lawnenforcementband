# ============================================================
# Lawn Enforcement Band — Makefile
# Windows 95-style band website (FastAPI + vanilla JS)
# ============================================================

VENV       := venv
PYTHON     := $(VENV)/bin/python
PIP        := $(VENV)/bin/pip
PYTHON_BIN ?= /opt/homebrew/bin/python3.12
HOST       ?= 0.0.0.0
PORT       ?= 8000
LOG_LEVEL  ?= info

.DEFAULT_GOAL := help

# ── Help ─────────────────────────────────────────────────────
.PHONY: help
help: ## Show this help message
	@echo ""
	@echo "  Lawn Enforcement Band — Dev Commands"
	@echo "  ====================================="
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "  Env vars: HOST (default: $(HOST))  PORT (default: $(PORT))  LOG_LEVEL (default: $(LOG_LEVEL))"
	@echo "  Example:  make dev PORT=9000"
	@echo ""

# ── Setup ─────────────────────────────────────────────────────
.PHONY: install
install: ## Create virtualenv and install dependencies
	@echo "→ Creating virtual environment (Python 3.12)..."
	$(PYTHON_BIN) -m venv $(VENV)
	@echo "→ Installing dependencies from requirements.txt..."
	$(PIP) install --upgrade pip -q
	$(PIP) install -r requirements.txt
	@echo "✓ Done. Run 'make dev' to start the server."

# ── Development ───────────────────────────────────────────────
.PHONY: dev
dev: ## Start dev server with hot reload (http://localhost:$(PORT))
	@echo "→ Starting Lawn Enforcement on http://$(HOST):$(PORT) ..."
	@echo "   Hot reload: enabled | Log level: $(LOG_LEVEL)"
	APP_HOST=$(HOST) APP_PORT=$(PORT) LOG_LEVEL=$(LOG_LEVEL) $(PYTHON) main.py

# ── Logs ──────────────────────────────────────────────────────
.PHONY: logs
logs: ## Tail the application log file
	@echo "→ Tailing logs/app.log (Ctrl+C to stop)..."
	tail -f logs/app.log

.PHONY: logs-clear
logs-clear: ## Delete all log files in logs/
	@echo "→ Clearing log files..."
	rm -f logs/*.log logs/*.log.*
	@echo "✓ Log files cleared."

# ── Utilities ─────────────────────────────────────────────────
.PHONY: freeze
freeze: ## Update requirements.txt from current venv
	@echo "→ Freezing dependencies to requirements.txt..."
	$(PIP) freeze > requirements.txt
	@echo "✓ requirements.txt updated."

.PHONY: clean
clean: ## Remove virtualenv, logs, and Python cache files
	@echo "→ Removing venv, logs, and __pycache__..."
	rm -rf $(VENV) logs __pycache__ .pytest_cache
	find . -name "*.pyc" -delete
	@echo "✓ Clean."

.PHONY: info
info: ## Show environment info
	@echo ""
	@echo "  Project : Lawn Enforcement Band"
	@echo "  Python  : $$(python3 --version)"
	@echo "  Venv    : $(VENV)"
	@echo "  Host    : $(HOST)"
	@echo "  Port    : $(PORT)"
	@echo "  Static  : ./static/"
	@echo "  Logs    : ./logs/app.log"
	@echo ""
