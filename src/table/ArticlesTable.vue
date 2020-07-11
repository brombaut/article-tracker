<template>
  <table id="articles-table">
    <thead>
      <tr class="table-header">
        <th colspan="7">{{ tableTitle }}</th>
      </tr>
      <tr class="column-headers">
        <!-- Created -->
        <th>
          <div class="column-headers-primary">
            <div class="column-header-title">Created</div>
            <div class="column-header-sort-icons">
              <i
                :class="{'material-icons': true, 'selectedSort': sortString === 'created-ascending' }"
                @click="() => setSortType('created', 'ascending')"
              >arrow_drop_up</i>
              <i
                :class="{'material-icons': true, 'selectedSort': sortString === 'created-descending' }"
                @click="() => setSortType('created', 'descending')"
              >arrow_drop_down</i>
            </div>
          </div>
        </th>
        <!-- Last Clicked -->
        <th>
          <div class="column-headers-primary">
            <div class="column-header-title">Last Clicked</div>
            <div class="column-header-sort-icons">
              <i
                :class="{'material-icons': true, 'selectedSort': sortString === 'lastClicked-ascending' }"
                @click="() => setSortType('lastClicked', 'ascending')"
              >arrow_drop_up</i>
              <i
                :class="{'material-icons': true, 'selectedSort': sortString === 'lastClicked-descending' }"
                @click="() => setSortType('lastClicked', 'descending')"
              >arrow_drop_down</i>
            </div>
          </div>
        </th>
        <!-- Title -->
        <th class="title-column">
          <div class="column-headers-primary">
            <div class="column-header-title">Title</div>
            <div class="column-header-sort-icons">
              <i
                :class="{'material-icons': true, 'selectedSort': sortString === 'title-ascending' }"
                @click="() => setSortType('title', 'ascending')"
              >arrow_drop_up</i>
              <i
                :class="{'material-icons': true, 'selectedSort': sortString === 'title-descending' }"
                @click="() => setSortType('title', 'descending')"
              >arrow_drop_down</i>
            </div>
          </div>
        </th>
        <!-- Minute Read -->
        <th class="minute-read-column">
          <div class="column-headers-primary">
            <div class="column-header-title">Minute Read</div>
            <div class="column-header-sort-icons">
              <i
                :class="{'material-icons': true, 'selectedSort': sortString === 'minuteRead-ascending' }"
                @click="() => setSortType('minuteRead', 'ascending')"
              >arrow_drop_up</i>
              <i
                :class="{'material-icons': true, 'selectedSort': sortString === 'minuteRead-descending' }"
                @click="() => setSortType('minuteRead', 'descending')"
              >arrow_drop_down</i>
            </div>
          </div>
        </th>
        <!-- Tags -->
        <th class="tags-column">
          <div class="column-headers-primary">
            <div class="column-header-title">Tags</div>
          </div>
        </th>
        <!-- URL -->
        <th class="url-column">
          <div class="column-headers-primary">
            <div class="column-header-title">URL</div>
            <div class="column-header-sort-icons">
              <i
                :class="{'material-icons': true, 'selectedSort': sortString === 'url-ascending' }"
                @click="() => setSortType('url', 'ascending')"
              >arrow_drop_up</i>
              <i
                :class="{'material-icons': true, 'selectedSort': sortString === 'url-descending' }"
                @click="() => setSortType('url', 'descending')"
              >arrow_drop_down</i>
            </div>
          </div>
        </th>
        <!-- Read -->
        <th>
          <div class="column-headers-primary">
            <div class="column-header-title">Read</div>
            <div class="column-header-sort-icons">
              <i
                :class="{'material-icons': true, 'selectedSort': sortString === 'read-ascending' }"
                @click="() => setSortType('read', 'ascending')"
              >arrow_drop_up</i>
              <i
                :class="{'material-icons': true, 'selectedSort': sortString === 'read-descending' }"
                @click="() => setSortType('read', 'descending')"
              >arrow_drop_down</i>
            </div>
          </div>
        </th>
      </tr>
      <tr class="filter-headers">
        <!-- Created At -->
        <th>
          <input
            id="filter-created"
            type="text"
            placeholder="Filter Created..."
            v-model="filterCreated"
          />
        </th>
        <!-- Last Clicked -->
        <th>
          <input
            id="filter-last-clicked"
            type="text"
            placeholder="Filter Last Clicked..."
            v-model="filterLastClicked"
          />
        </th>
        <!-- Title -->
        <th>
          <input id="filter-title" type="text" placeholder="Filter Title..." v-model="filterTitle" />
        </th>
        <!-- Minute Read -->
        <th></th>
        <!-- Tags -->
        <th></th>
        <!-- Url -->
        <th>
          <input id="filter-url" type="text" placeholder="Filter URL..." v-model="filterUrl" />
        </th>
        <th>
          <select id="filter-read" v-model="filterRead">
            <option value>All</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
          </select>
        </th>
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
import { bus } from '@/main';

export default {
  name: 'ArticlesTable',
  props: {
    rows: Array,
    sortString: String,
  },
  data() {
    return {
      filterCreated: '',
      filterLastClicked: '',
      filterTitle: '',
      filterUrl: '',
      filterRead: 'unread',
    };
  },
  filters: {
    formatEpochAsDate(epoch) {
      if (!epoch) {
        return '';
      }
      const date = new Date(0);
      date.setUTCSeconds(epoch);
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    },
  },
  computed: {
    tableTitle() {
      switch (this.filterRead) {
        case 'unread':
          return 'Unread Articles';
        case 'read':
          return 'Read Articles';
        default:
          return 'All Articles';
      }
    },
  },
  methods: {
    setSortType(attribute, type) {
      const updateSortType = {
        attribute,
        type,
      };
      bus.$emit('sortUpdated', updateSortType);
    },
    handleRowClick(row) {
      window.open(row.url, '_blank').focus();
      bus.$emit('articleClicked', row);
    },
  },
  watch: {
    filterCreated(newVal) {
      const filterUpdateObject = {
        type: 'created',
        value: newVal,
      };
      bus.$emit('filterUpdated', filterUpdateObject);
    },
    filterLastClicked(newVal) {
      const filterUpdateObject = {
        type: 'created',
        value: newVal,
      };
      bus.$emit('filterUpdated', filterUpdateObject);
    },
    filterTitle(newVal) {
      const filterUpdateObject = {
        type: 'title',
        value: newVal,
      };
      bus.$emit('filterUpdated', filterUpdateObject);
    },
    filterUrl(newVal) {
      const filterUpdateObject = {
        type: 'url',
        value: newVal,
      };
      bus.$emit('filterUpdated', filterUpdateObject);
    },
    filterRead(newVal) {
      const filterUpdateObject = {
        type: 'read',
        value: newVal,
      };
      bus.$emit('filterUpdated', filterUpdateObject);
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

  .title-column {
    width: 550px;
  }

  .tags-column {
    width: 220px;
  }

  .url-column {
    width: 72px;
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

      .column-headers-primary {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .column-header-title {
          font-size: 20px;
          margin-right: 8px;
        }

        .column-header-sort-icons {
          display: flex;
          flex-direction: column;

          i {
            font-size: 32px;
            margin: -6px;

            &:hover {
              cursor: pointer;
              color: $primaryBrightest;
            }
          }

          .selectedSort {
            color: $primaryBrighter;
          }
        }
      }
    }
    tr.filter-headers {
      background-color: $primaryLighter;
      color: $secondary;

      th {
        padding: 0;

        input[type="text"] {
          padding: 6px;
          width: calc(100% - 14px);
          font-size: 16px;
          background-color: $primaryLighter;
          color: $secondary;
          border: 1px solid $primary;

          &:focus {
            border: 1px solid #42b983;
          }
        }

        #filter-read {
          padding: 6px;
          width: 100%;
          font-size: 16px;
          background-color: $primaryLighter;
          color: $secondary;
          border: 1px solid $primary;
        }
      }
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
