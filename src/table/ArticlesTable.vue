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
        <td>{{ row.createdAt.seconds | formatEpochAsDate}}</td>
        <td>{{ row.lastClicked.seconds | formatEpochAsDate}}</td>
        <td>
          <b>{{ row.title }}</b>
        </td>
        <td class="minute-read-column">{{ row.minuteRead ? `${row.minuteRead} min read` : '' }}</td>
        <td class="tags-column">
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
        <td class="url-column">
          <a :href="row.url" @click="(e) => e.preventDefault()">
            <i class="material-icons" style="font-size:24px">link</i>
          </a>
        </td>
        <td :class="{'readColumn': true, 'articleRead': row.read, 'articleNotRead': !row.read}">
          <i v-if="row.read" class="material-icons" style="font-size:24px">check_box</i>
          <i v-else class="material-icons" style="font-size:24px">check_box_outline_blank</i>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { bus } from "@/main";
import TableHeader from "./TableHeader";
import FilterHeader from "./FilterHeader";

export default {
  name: "ArticlesTable",
  props: {
    rows: Array,
    sortString: String,
  },
  components: {
    TableHeader,
    FilterHeader,
  },
  data() {
    return {
      filterCreated: "",
      filterLastClicked: "",
      filterTitle: "",
      filterUrl: "",
      filterRead: "unread",
      columns: [
        {
          title: "Created",
          key: "created",
          filter: {
            filterType: "text",
            placeholder: "Filter Created...",
            onchange: (val) => this.filterCreated = val,
          },
        },
        {
          title: "Last Clicked",
          key: "lastClicked",
          filter: {
            filterType: "text",
            placeholder: "Filter Last Clicked...",
            onchange: (val) => this.filterLastClicked = val,
          },
        },
        {
          title: "Title",
          key: "title",
          filter: {
            filterType: "text",
            placeholder: "Filter Title...",
            onchange: (val) => this.filterTitle = val,
          },
        },
        {
          title: "Minute Read",
          key: "minuteRead",
          filter: {
            filterType: "none",
          },
        },
        {
          title: "Tags",
          key: "tags",
          filter: {
            filterType: "none",
          },
        },
        {
          title: "URL",
          key: "url",
          filter: {
            filterType: "text",
            placeholder: "Filter URL...",
            onchange: (val) => this.filterUrl = val,
          },
        },
        {
          title: "Read",
          key: "read",
          filter: {
            filterType: "select",
            onchange: (val) => this.filterRead = val,
          },
        },
      ],
    };
  },
  filters: {
    formatEpochAsDate(epoch) {
      if (!epoch) {
        return "";
      }
      const date = new Date(0);
      date.setUTCSeconds(epoch);
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    },
  },
  computed: {
    tableTitle() {
      switch (this.filterRead) {
        case "unread":
          return "Unread Articles";
        case "read":
          return "Read Articles";
        default:
          return "All Articles";
      }
    },
  },
  methods: {
    setSortType({ attribute, type }) {
      const updateSortType = {
        attribute,
        type,
      };
      bus.$emit("sortUpdated", updateSortType);
    },
    handleRowClick(row) {
      window.open(row.url, "_blank").focus();
      bus.$emit("articleClicked", row);
    },
  },
  watch: {
    filterCreated(newVal) {
      const filterUpdateObject = {
        type: "created",
        value: newVal,
      };
      bus.$emit("filterUpdated", filterUpdateObject);
    },
    filterLastClicked(newVal) {
      const filterUpdateObject = {
        type: "created",
        value: newVal,
      };
      bus.$emit("filterUpdated", filterUpdateObject);
    },
    filterTitle(newVal) {
      const filterUpdateObject = {
        type: "title",
        value: newVal,
      };
      bus.$emit("filterUpdated", filterUpdateObject);
    },
    filterUrl(newVal) {
      const filterUpdateObject = {
        type: "url",
        value: newVal,
      };
      bus.$emit("filterUpdated", filterUpdateObject);
    },
    filterRead(newVal) {
      const filterUpdateObject = {
        type: "read",
        value: newVal,
      };
      bus.$emit("filterUpdated", filterUpdateObject);
    },
  },
};
</script>

<style lang='scss'>
#articles-table {
  border-collapse: collapse;
  max-width: 1600px;
  user-select: none;

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
