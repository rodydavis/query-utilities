import { html, css, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { SearchQuery, highlight } from "query-utilities";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: { name: string };
  address: { city: string };
}

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

type Result =
  | { type: "USER"; item: User; search: string }
  | { type: "TODO"; item: Todo; search: string };

const EXAMPLES: { label: string; query: string; desc: string }[] = [
  { label: "Text", query: "Bret", desc: "Basic text search across all fields" },
  { label: "All Users", query: "@users", desc: "Section query — all users" },
  { label: "All Todos", query: "@todos", desc: "Section query — all todos" },
  { label: "Field Scope", query: "name:Leanne", desc: "Search a specific field" },
  { label: "Section+Field", query: "@todos userId:1", desc: "Section + field scope" },
  { label: "OR", query: "name:Leanne OR name:Ervin", desc: "OR operator" },
  { label: "AND", query: "name:Leanne AND email:Sincere", desc: "AND operator" },
  { label: "NOT", query: "NOT Leanne", desc: "NOT operator" },
  { label: "Exact Phrase", query: '"Leanne Graham"', desc: "Exact phrase match" },
  { label: "Field Compare", query: "userId = 1", desc: "Field comparison (=, <, >)" },
  { label: "Range", query: "title:[a TO m]", desc: "Inclusive range query on a field" },
];

@customElement("search-example")
export class SearchExample extends LitElement {
  static styles = css`
    :host {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        sans-serif;
      color: #202124;
    }

    * {
      box-sizing: border-box;
    }

    main {
      max-width: 820px;
      margin: 0 auto;
      padding: 32px 16px;
    }

    h1 {
      margin: 0 0 4px;
      font-size: 1.875rem;
      font-weight: 700;
    }

    .subtitle {
      color: #5f6368;
      margin: 0 0 28px;
      font-size: 0.9375rem;
    }

    input[type="text"] {
      width: 100%;
      padding: 12px 16px;
      font-size: 1rem;
      border: 2px solid #dadce0;
      border-radius: 8px;
      outline: none;
      transition: border-color 0.15s;
      margin-bottom: 16px;
    }

    input[type="text"]:focus {
      border-color: #1a73e8;
    }

    .examples-label {
      font-size: 0.8125rem;
      color: #5f6368;
      margin-bottom: 8px;
    }

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 20px;
    }

    button.chip {
      padding: 5px 12px;
      border: 1px solid #dadce0;
      border-radius: 16px;
      font-size: 0.8125rem;
      cursor: pointer;
      background: #f8f9fa;
      color: #202124;
      transition: background 0.15s, border-color 0.15s, color 0.15s;
      white-space: nowrap;
      font-family: inherit;
    }

    button.chip:hover {
      background: #e8f0fe;
      border-color: #1a73e8;
      color: #1a73e8;
    }

    button.chip code {
      font-family: "SFMono-Regular", Consolas, monospace;
      font-size: 0.75rem;
    }

    .query-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      min-height: 28px;
      margin-bottom: 16px;
    }

    .query-type {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 700;
      font-family: "SFMono-Regular", Consolas, monospace;
      letter-spacing: 0.03em;
    }

    .query-type.TEXT {
      background: #e6f4ea;
      color: #137333;
    }
    .query-type.PHRASE {
      background: #fce8b2;
      color: #b45309;
    }
    .query-type.AND {
      background: #e8f0fe;
      color: #1a73e8;
    }
    .query-type.OR {
      background: #f3e8fd;
      color: #7b1fa2;
    }
    .query-type.NOT {
      background: #fce8e6;
      color: #c5221f;
    }
    .query-type.FIELD_SCOPE {
      background: #e0f7fa;
      color: #00695c;
    }
    .query-type.FIELD_COMPARE {
      background: #fff8e1;
      color: #e65100;
    }
    .query-type.SECTION {
      background: #e8eaf6;
      color: #283593;
    }
    .query-type.RANGE {
      background: #f1f8e9;
      color: #33691e;
    }
    .query-type.GROUP {
      background: #f5f5f5;
      color: #424242;
    }

    .result-count {
      font-size: 0.875rem;
      color: #5f6368;
    }

    .results {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .result-card {
      padding: 16px;
      border-radius: 8px;
      border: 1px solid #dadce0;
      background: #fff;
    }

    .result-card.user {
      border-left: 4px solid #1a73e8;
    }

    .result-card.todo {
      border-left: 4px solid #34a853;
    }

    .result-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 10px;
    }

    .result-title {
      font-size: 1rem;
      font-weight: 600;
      margin: 0;
      line-height: 1.4;
    }

    .badge {
      font-size: 0.6875rem;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .badge.user {
      background: #e8f0fe;
      color: #1a73e8;
    }

    .badge.todo {
      background: #e6f4ea;
      color: #137333;
    }

    .result-meta {
      font-size: 0.875rem;
      color: #5f6368;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .meta-row {
      display: flex;
      gap: 6px;
      align-items: baseline;
    }

    .meta-label {
      font-weight: 600;
      color: #3c4043;
      min-width: 72px;
    }

    .completed-yes {
      color: #137333;
      font-weight: 500;
    }

    .completed-no {
      color: #c5221f;
      font-weight: 500;
    }

    mark {
      background: #fbf303;
      border-radius: 2px;
      padding: 0 1px;
      color: inherit;
    }

    .loading,
    .empty {
      text-align: center;
      padding: 56px 16px;
      color: #5f6368;
      font-size: 1rem;
    }

    .syntax-ref {
      margin-top: 36px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #dadce0;
    }

    .syntax-ref h2 {
      margin: 0 0 14px;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #5f6368;
      font-weight: 600;
    }

    table.syntax-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }

    table.syntax-table td {
      padding: 5px 8px;
      vertical-align: top;
    }

    table.syntax-table td:first-child {
      font-family: "SFMono-Regular", Consolas, monospace;
      font-size: 0.8rem;
      color: #c0392b;
      white-space: nowrap;
      width: 1%;
    }

    table.syntax-table td:last-child {
      color: #5f6368;
    }
  `;

  @state() loaded = false;
  @state() value = "";
  @state() results: Result[] = [];
  @state() queryType = "";
  private sq = new SearchQuery<Result>();

  render() {
    if (!this.loaded) {
      return html`<div class="loading">Loading data…</div>`;
    }
    return html`
      <main>
        <h1>Query Utilities</h1>
        <p class="subtitle">
          Zero-dependency JavaScript library for advanced search and query
          parsing. Search across multiple data sources using a rich query
          syntax.
        </p>

        <input
          type="text"
          placeholder='Try: @users, name:Leanne, "Leanne Graham", NOT Leanne'
          .value=${this.value}
          @input=${this.onInput.bind(this)}
        />

        <div class="examples-label">Click an example to try it:</div>
        <div class="chips">
          ${EXAMPLES.map(
            (ex) =>
              html`<button
                class="chip"
                title=${ex.desc}
                @click=${() => this.setQuery(ex.query)}
              >
                ${ex.label}: <code>${ex.query}</code>
              </button>`
          )}
        </div>

        <div class="query-bar">
          ${this.queryType
            ? html`
                <span class="query-type ${this.queryType}"
                  >${this.queryType}</span
                >
                <span class="result-count"
                  >${this.results.length}
                  result${this.results.length !== 1 ? "s" : ""}</span
                >
              `
            : ""}
        </div>

        <div class="results">
          ${this.value && this.results.length === 0
            ? html`<div class="empty">
                No results found for &ldquo;${this.value}&rdquo;
              </div>`
            : this.results.map((r) => this.renderResult(r))}
        </div>

        ${this.renderSyntaxRef()}
      </main>
    `;
  }

  private renderResult(result: Result) {
    if (result.type === "USER") {
      const user = result.item;
      return html`
        <div class="result-card user">
          <div class="result-header">
            <h3 class="result-title">
              ${unsafeHTML(this.hl(user.name, result.search))}
            </h3>
            <span class="badge user">User</span>
          </div>
          <div class="result-meta">
            <div class="meta-row">
              <span class="meta-label">username:</span>
              <span>${unsafeHTML(this.hl(user.username, result.search))}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">email:</span>
              <span>${unsafeHTML(this.hl(user.email, result.search))}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">phone:</span>
              <span>${user.phone}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">company:</span>
              <span>${user.company.name}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">city:</span>
              <span>${user.address.city}</span>
            </div>
          </div>
        </div>
      `;
    }
    if (result.type === "TODO") {
      const todo = result.item;
      return html`
        <div class="result-card todo">
          <div class="result-header">
            <h3 class="result-title">
              ${unsafeHTML(this.hl(todo.title, result.search))}
            </h3>
            <span class="badge todo">Todo</span>
          </div>
          <div class="result-meta">
            <div class="meta-row">
              <span class="meta-label">id:</span>
              <span>${todo.id}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">userId:</span>
              <span>${todo.userId}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">completed:</span>
              <span class="${todo.completed ? "completed-yes" : "completed-no"}"
                >${todo.completed ? "✓ Yes" : "✗ No"}</span
              >
            </div>
          </div>
        </div>
      `;
    }
    return html``;
  }

  private renderSyntaxRef() {
    return html`
      <div class="syntax-ref">
        <h2>Query Syntax Reference</h2>
        <table class="syntax-table">
          <tr>
            <td>hello world</td>
            <td>Text search across all fields</td>
          </tr>
          <tr>
            <td>"exact phrase"</td>
            <td>Exact phrase match (PhraseQuery)</td>
          </tr>
          <tr>
            <td>field:value</td>
            <td>Scope search to a specific field (FieldScope)</td>
          </tr>
          <tr>
            <td>field = value</td>
            <td>
              Field comparison with operator =, &lt;, &gt; (FieldCompareQuery)
            </td>
          </tr>
          <tr>
            <td>@section</td>
            <td>Return all items from a named section (SectionQuery)</td>
          </tr>
          <tr>
            <td>@section query</td>
            <td>Search within a section (SectionQuery)</td>
          </tr>
          <tr>
            <td>A AND B</td>
            <td>Both conditions must match (AndQuery)</td>
          </tr>
          <tr>
            <td>A OR B</td>
            <td>Either condition must match (OrQuery)</td>
          </tr>
          <tr>
            <td>NOT query</td>
            <td>Exclude matching results (NotQuery)</td>
          </tr>
          <tr>
            <td>(A OR B) AND C</td>
            <td>Group expressions with parentheses (GroupQuery)</td>
          </tr>
          <tr>
            <td>field:[start TO end]</td>
            <td>Inclusive range on a field (RangeQuery)</td>
          </tr>
          <tr>
            <td>field:{start TO end}</td>
            <td>Exclusive range on a field (RangeQuery)</td>
          </tr>
        </table>
      </div>
    `;
  }

  private hl(source: string, query: string): string {
    if (!query || !source) return source;
    try {
      return highlight(source, query);
    } catch {
      return source;
    }
  }

  private setQuery(q: string) {
    this.value = q;
    this.updateResults();
  }

  private onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.updateResults();
  }

  private updateResults() {
    this.results = [];
    this.queryType = "";
    if (this.value) {
      const parsed = this.sq.getQuery(this.value);
      this.queryType = parsed.type;
      this.results = this.sq.getResults(this.value);
    }
  }

  async firstUpdated() {
    const [todos, users] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/todos").then((r) =>
        r.json()
      ),
      fetch("https://jsonplaceholder.typicode.com/users").then((r) =>
        r.json()
      ),
    ]);
    this.sq.addSource("todos", todos, (item, search) => ({
      type: "TODO" as const,
      item: item as Todo,
      search,
    }));
    this.sq.addSource("users", users, (item, search) => ({
      type: "USER" as const,
      item: item as User,
      search,
    }));
    this.loaded = true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "search-example": SearchExample;
  }
}
