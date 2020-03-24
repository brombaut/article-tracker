<template>
  <table id='articles-table'>
      <thead>
            <tr class='column-headers'>
                <th>
                    <div class='column-headers-primary'>
                        <div class='column-header-title'>Created</div>
                        <div class='column-header-sort-icons'>
                            <i
                                :class="{'material-icons': true, 'selectedSort': sortString === 'created-ascending' }"
                                @click="() => setSortType('created', 'ascending')">
                                arrow_drop_up
                            </i>
                            <i
                                :class="{'material-icons': true, 'selectedSort': sortString === 'created-descending' }"
                                @click="() => setSortType('created', 'descending')">
                                arrow_drop_down
                            </i>
                        </div>
                    </div>
                </th>
                <th class="title-column">
                    <div class='column-headers-primary'>
                        <div class='column-header-title'>Title</div>
                        <div class='column-header-sort-icons'>
                            <i
                                :class="{'material-icons': true, 'selectedSort': sortString === 'title-ascending' }"
                                @click="() => setSortType('title', 'ascending')">
                                arrow_drop_up
                            </i>
                            <i
                                :class="{'material-icons': true, 'selectedSort': sortString === 'title-descending' }"
                                @click="() => setSortType('title', 'descending')">
                                arrow_drop_down
                            </i>
                        </div>
                    </div>
                </th>
                <th class="url-column">
                    <div class='column-headers-primary'>
                        <div class='column-header-title'>URL</div>
                        <div class='column-header-sort-icons'>
                            <i
                                :class="{'material-icons': true, 'selectedSort': sortString === 'url-ascending' }"
                                @click="() => setSortType('url', 'ascending')">
                                arrow_drop_up
                            </i>
                            <i
                                :class="{'material-icons': true, 'selectedSort': sortString === 'url-descending' }"
                                @click="() => setSortType('url', 'descending')">
                                arrow_drop_down
                            </i>
                        </div>
                    </div>
                </th>
                <th>
                    <div class='column-headers-primary'>
                        <div class='column-header-title'>Read</div>
                        <div class='column-header-sort-icons'>
                            <i
                                :class="{'material-icons': true, 'selectedSort': sortString === 'read-ascending' }"
                                @click="() => setSortType('read', 'ascending')">
                                arrow_drop_up
                            </i>
                            <i
                                :class="{'material-icons': true, 'selectedSort': sortString === 'read-descending' }"
                                @click="() => setSortType('read', 'descending')">
                                arrow_drop_down
                            </i>
                        </div>
                    </div>
                </th>
            </tr>
            <tr class='filter-headers'>
                <th>
                    <input
                        id='filter-created'
                        type='text'
                        placeholder="Filter Created..."
                        v-model="filterCreated" />
                </th>
                <th>
                    <input
                        id='filter-title'
                        type='text'
                        placeholder="Filter Title..."
                        v-model="filterTitle" />
                </th>
                <th>
                    <input
                        id='filter-url'
                        type='text'
                        placeholder="Filter URL..."
                        v-model="filterUrl" />
                </th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="row in rows"
                :key="row.url"
                @click="handleRowClick(row)">
                <td>{{ row.createdAt.seconds | formatEpochAsDate}}</td>
                <td><b>{{ row.title }}</b></td>
                <td class="url-column">{{ row.url }}</td>
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
            filterTitle: '',
            filterUrl: '',
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
    },
};
</script>

<style lang='scss'>
#articles-table {
    border-collapse: collapse;
    width: 100%;

    td, th {
        border: 1px solid #bbbbbb;
        text-align: left;
        padding: 8px;
    }

    thead {
        tr.column-headers {
            background-color: #259764;
            color: white;

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
                            color: #42b983;
                        }
                    }

                    .selectedSort {
                        color: #59fab1;
                    }
                }
            }
        }
        tr.filter-headers {
            background-color: #dff5eb;
            color: white;

            th {
                padding: 0;

                input[type=text] {
                    padding: 6px;
                    width: calc(100% - 14px);
                    font-size: 16px;
                    background-color: #dff5eb;
                    border: 1px solid #259764;

                    &:focus {
                        border: 1px solid #42b983;
                    }
                }
            }
        }
    }

    tbody {
        tr:nth-child(even) {
            background-color: #ebe7e7;
        }

        tr:hover {
            cursor: pointer;
            background-color: #e1fcf1;

            .articleRead {
                background-color: #e1fcf1;
                color: #56c291;
            }
        }

        .readColumn {
            text-align: center;
        }

        .articleRead {
            background-color: #56c291;
            color: white;
        }

        .articleNotRead {
            color: #800c0c;
        }
    }

}

</style>
