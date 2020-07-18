<template>
  <table id="articles-table">
    <thead>
      <tr class="table-header">
        <th colspan="7">{{ tableTitle }}</th>
      </tr>
      <tr class="column-headers">
        <TableHeader
          v-for="column in columns"
          :key="column.key"
          :column="column"
          :sortString="sortString"
          @sortButtonClicked="setSortType"
        />
      </tr>
      <tr class="filter-headers">
        <FilterHeader v-for="column in columns" :key="column.key" :column="column" />
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.url" @click="handleRowClick(row)">
        <td :class="columns[0].classList">{{ formatEpochAsDate(row.createdAt.seconds)}}</td>
        <td :class="columns[1].classList">{{ formatEpochAsDate(row.lastClicked.seconds)}}</td>
        <td :class="columns[2].classList">
          <b>{{ row.title }}</b>
        </td>
        <td
          class="minute-read-column"
          :class="columns[3].classList"
        >{{ row.minuteRead ? `${row.minuteRead} min read` : '' }}</td>
        <td class="tags-column" :class="columns[4].classList">
          <div class="tags-container">
            <a
              v-for="tag in row.tags"
              :key="tag.name"
              class="article-tag"
              :href="tag.href"
              target="_blank"
              @click.stop="() => {}"
              :style="tag"
            >{{ tag.name }}</a>
          </div>
        </td>
        <td class="url-column" :class="columns[5].classList">
          <a :href="row.url" @click="(e) => e.preventDefault()">
            <i class="material-icons" style="font-size:24px">link</i>
          </a>
        </td>
        <td
          :class="{'readColumn': true, 'articleRead': row.read, 'articleNotRead': !row.read, ...columns[6].classList}"
        >
          <i v-if="row.read" class="material-icons" style="font-size:24px">check_box</i>
          <i v-else class="material-icons" style="font-size:24px">check_box_outline_blank</i>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { bus } from "@/main";
import TableHeader from "./TableHeader.vue";
import FilterHeader from "./FilterHeader.vue";
import SortType from "./sortType";
import FilterHandler from "./filterHandler";
import NoFilter from "./noFilter";
import Column from "./column";
import Filter from "./filter";

@Component({
  components: { TableHeader, FilterHeader },
})
export default class ArticlesTable extends Vue {
  @Prop()
  rows!: any[];

  @Prop()
  sortString!: string;

  filterCreated = "";

  createdFilter: FilterHandler = new FilterHandler("text", "Filter Created...", this.filterCreatedHandler);

  createdColumn: Column = new Column("Created", "created", this.createdFilter, { "hide-medium-screen": true });

  filterCreatedHandler(newVal: string): void {
    this.filterUpdated("created", newVal);
  }

  filterLastClicked = "";

  lastClickedFilter: FilterHandler = new FilterHandler("text", "Filter Last Clicked...", this.filterLastClickedHandler);

  lastClickedColumn: Column = new Column("Last Clicked", "lastClicked", this.lastClickedFilter, {
    "hide-medium-screen": true,
  });

  filterLastClickedHandler(newVal: string): void {
    this.filterUpdated("lastClicked", newVal);
  }

  filterTitle = "";

  titleFilter: FilterHandler = new FilterHandler("text", "Filter Title...", this.filterTitleHandler);

  titleColumn: Column = new Column("Title", "title", this.titleFilter, {});

  filterTitleHandler(newVal: string): void {
    this.filterUpdated("url", newVal);
  }

  minuteReadColumn: Column = new Column("Minute Read", "minuteRead", new NoFilter(), {});

  tagsColumn: Column = new Column("Tags", "tags", new NoFilter(), { "hide-small-screen": true });

  filterUrl = "";

  urlFilter: FilterHandler = new FilterHandler("text", "Filter URL...", this.filterUrlHandler);

  urlColumn: Column = new Column("URL", "url", this.urlFilter, { "hide-small-screen": true });

  filterUrlHandler(newVal: string): void {
    this.filterUpdated("url", newVal);
  }

  filterRead = "unread";

  readFilter: FilterHandler = new FilterHandler("text", "", this.filterReadHandler);

  readColumn: Column = new Column("Read", "read", this.readFilter, { "hide-tiny-screen": true });

  filterReadHandler(newVal: string): void {
    this.filterUpdated("read", newVal);
  }

  get columns(): Column[] {
    return [
      this.createdColumn,
      this.lastClickedColumn,
      this.titleColumn,
      this.minuteReadColumn,
      this.tagsColumn,
      this.urlColumn,
      this.readColumn,
    ];
  }

  get tableTitle(): string {
    switch (this.filterRead) {
      case "unread":
        return "Unread Articles";
      case "read":
        return "Read Articles";
      default:
        return "All Articles";
    }
  }

  formatEpochAsDate(epoch: number): string {
    if (!epoch) {
      return "";
    }
    const date = new Date(0);
    date.setUTCSeconds(epoch);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  setSortType(type: SortType): void {
    bus.$emit("sortUpdated", type);
  }

  handleRowClick(row: any): void {
    const result = window.open(row.url, "_blank");
    if (result) {
      result.focus();
    }
    bus.$emit("articleClicked", row);
  }

  filterUpdated(type: string, value: string): void {
    const filterUpdateObject: Filter = new Filter(type, value);
    bus.$emit("filterUpdated", filterUpdateObject);
  }
}
</script>

<style lang='scss'>
#articles-table {
  border-collapse: collapse;
  max-width: 1600px;
  user-select: none;
  margin: 0 12px;
  margin-top: 16px;

  td,
  th {
    border: 1px solid $secondaryBrightest;
    text-align: left;
    padding: 8px;
  }

  thead {
    tr.table-header {
      background-color: $primary;
      color: $secondary;
      font-size: 36px;

      th {
        text-align: center;
        padding: 16px 0;
      }
    }

    @media only screen and (max-width: 500px) {
      tr.table-header {
        font-size: 1.5rem;
      }
    }

    tr.column-headers {
      background-color: $primary;
      color: $secondary;
    }
    tr.filter-headers {
      background-color: $primaryLighter;
      color: $secondary;
    }
  }

  tbody {
    td {
      padding: 16px;
    }

    @media only screen and (max-width: 500px) {
      td {
        padding: 8px 2px;
        font-size: 0.7rem;
      }
    }

    tr:nth-child(odd) {
      background-color: $secondary;
    }

    tr:nth-child(even) {
      background-color: $secondaryBrighter;
    }

    tr:hover {
      cursor: pointer;
      background-color: $secondaryBrightest;

      td {
        border: 1px solid $secondary;
      }

      .articleRead {
        background-color: $secondaryBrightest;
      }
    }

    .readColumn {
      text-align: center;
    }

    .articleRead {
      color: $primary;
    }

    .articleNotRead {
      color: #800c0c;
    }

    .tags-column {
      padding: 8px;

      .tags-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        .article-tag {
          border-radius: 4px;
          padding: 4px;
          background: #d6d9e0;
          color: #606570;
          margin: 4px;
          font-size: 14px;
          transition: 0.3s;
          text-decoration: none;

          &:hover {
            cursor: pointer;
            background: $primary !important;
            color: $secondary !important;
          }
        }
      }
    }

    .minute-read-column {
      text-align: center;
    }

    .url-column {
      text-align: center;

      i {
        color: $primary;
      }
    }
  }
}
</style>
