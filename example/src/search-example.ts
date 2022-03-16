import { html, css, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { SearchQuery } from "query-utilities";

@customElement("search-example")
export class SearchExample extends LitElement {
  static styles = css`
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    header,
    section {
      max-width: 600px;
      width: 100%;
    }

    input {
      width: 100%;
    }

    div.user {
      border-left: 5px solid #f44336;
    }
    div.todo {
      border-left: 5px solid #2196f3;
    }
    div.result {
      padding: 10px;
    }
  `;

  @state() loaded = false;
  @state() value = "";
  @state() results: Result[] = [];
  query = new SearchQuery<Result>();

  render() {
    if (!this.loaded) {
      return html`<div>Loading...</div>`;
    }
    return html`<main>
      <header>
        <h2>Query Utilities</h2>
        <input
          type="text"
          placeholder="Search"
          value=${this.value}
          @input=${this.onInput.bind(this)}
        />
      </header>
      <section>
        ${this.results.map((result) => {
          if (result.type === "USER") {
            return html`<div class="result user">
              <h3>${result.item.name}</h3>
              <p>${result.item.email}</p>
            </div>`;
          }
          if (result.type === "TODO") {
            return html`<div class="result todo">
              <h3>${result.item.title}</h3>
              <p>Completed: ${result.item.completed}</p>
            </div>`;
          }
          return html``;
        })}
      </section>
    </main>`;
  }

  private onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.results = [];
    if (this.value) {
      this.results = this.query.getResults(this.value);
    }
  }

  async firstUpdated() {
    const { query } = this;
    const todos = await fetch(
      "https://jsonplaceholder.typicode.com/todos"
    ).then((res) => res.json());
    query.addSource("todos", todos, (item, search) => ({
      type: "TODO",
      item,
      search,
    }));
    const users = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    ).then((res) => res.json());
    query.addSource("users", users, (item, search) => ({
      type: "USER",
      item,
      search,
    }));
    this.loaded = true;
  }
}

interface Result {
  type: string;
  item: any;
  search: string;
}

declare global {
  interface HTMLElementTagNameMap {
    "search-example": SearchExample;
  }
}
