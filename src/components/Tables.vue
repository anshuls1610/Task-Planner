<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :search="search"
    sort-by="calories"
    class="elevation-1"
    id="myDiv"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Product Status </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          dark
          class="mb-2 mr-2"
          @click="handleDownload()"
        >
          <v-icon
          dark
          left
          >
            mdi-download
          </v-icon>
          Export
          </v-btn>
          <v-btn
          color="primary"
          dark
          class="mb-2 mr-2"
          @click="handlePdf()"
        >
          <v-icon
          dark
          left
          >
            mdi-download
          </v-icon>
          Pdf
          </v-btn>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon
              dark
              left
              >
                mdi-pencil
              </v-icon>
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.product"
                      label="Product"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.category"
                      label="Category"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select v-if="formTitle == 'New Item'"
                        v-model="status"
                        :items="statusOptions"
                        label="Status"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save(formTitle)"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn
        small
        class="mr-2 white--text"
        color="purple"
        @click="editItem(item)"
      >
        Edit
      </v-btn>
      <v-btn
        v-if="item.status!='delivered'"
        small
        color="green"
        class="white--text"
        @click="handleModifyStatus(item,'delivered')"
      >
        Delivered
      </v-btn>
       <v-btn
        v-if="item.status!='cancelled'"
        small
        color="green"
        class="white--text"
        @click="handleModifyStatus(item,'cancelled')"
      >
        Cancelled
      </v-btn>
      <v-btn 
        small
        color="red"
        class="ml-2 white--text"
        @click="deleteItem(item)"
      >
        Delete
      </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        No data found
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Tables',
  data() {
      return{
      status: '',
      search: '',
      statusOptions: ['delivered', 'cancelled', 'delivering'],
      //currentStatus: '',
      dialog: false,
      dialogDelete: false,
      headers: [
          { text: 'Id', align: 'start', value: 'id' },
          { text: 'Product', value: 'product' },
          { text: 'Category', value: 'category' },
          { text: 'Status', value: 'status' },
          { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
          product: '',
          category: '',
          status: '',
      },
      defaultItem: {
          product: '',
          category: '',
          status: '',
      },
      }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      axios
        .get('http://localhost:3000/api/products')
        .then(response => {
          this.desserts = response.data
          //console.log(response.data)
        })
    },

    async handleModifyStatus(item, status) {
      console.log('my status: ', status)
      console.log('my status id is: ', item)
      await axios
      .put('http://localhost:3000/api/products/' + item.id, {
          status: status
      })
      .then(
          item.status = status
      )
    },

    editItem (item) {
      console.log("item", item)
      this.editedIndex = this.desserts.indexOf(item)
      console.log("index", this.editedIndex)
      this.editedItem = Object.assign({}, item)
      console.log("edititems", this.editedItem)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm () {
        await axios
        .delete('http://localhost:3000/api/products/' + this.editedItem.id)
        .then(
          this.desserts.splice(this.editedIndex, 1),
          this.closeDelete()
        )
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save (title) {
      if('New Item' == title){
        await axios
        .post('http://localhost:3000/api/products', {
          product: this.editedItem.product,
          category: this.editedItem.category,
          status: this.status
        })
        .then(() => {
          console.log(this.editedItem)
          if(this.editedIndex > -1) { 
              Object.assign(this.desserts[this.editedIndex], this.editedItem)
          } else {
              this.desserts.push(this.editedItem)
          }
          //this.close()
          this.$router.go(this.$router.currentRoute)
        })
      } else {
        await axios
        .put('http://localhost:3000/api/products/' + this.editedItem.id, {
          product: this.editedItem.product,
          category: this.editedItem.category,
          status: this.editedItem.status
        })
        .then(() => {
          console.log(this.editedItem)
          if(this.editedIndex > -1) { 
              Object.assign(this.desserts[this.editedIndex], this.editedItem)
          } else {
              this.desserts.push(this.editedItem)
          }
          this.close()
        })
      }
    },

    handleDownload() {
      console.log('here')
      //this.downloadLoading = true
      import('@/vendor/Export2Excel')
      .then(excel => {
        const tHeader = ['Id', 'Product', 'Category', 'Status']
        const filterVal = ['id', 'product', 'category', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        //this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      console.log(filterVal)
      return this.desserts.map(v => filterVal.map(j => {
        //console.log('vj', v[j])
        return v[j]
      }))
    },
    handlePdf(){
      this.$nextTick(() => {
        // console.log(document.getElementsByClassName("myDiv")[0])
        // var divContents = (document.getElementsByClassName("myDiv")[0]).innerHTML ;
        //     var printWindow = window.open('', '', 'height=400,width=800');
        //     printWindow.document.write('<html><head><title>DIV Contents</title>');
        //     printWindow.document.write('</head><body >');
        //     printWindow.document.write(divContents);
        //     printWindow.document.write('</body></html>');
        //     printWindow.document.close();
        //     printWindow.print();

        document.body.style.visibility = "hidden"
        document.getElementById("myDiv").style.visibility = "visible"
        window.print()
        document.body.style.visibility = "visible";

        // document.body.style.display = "none"
        // document.getElementById("myDiv").style.display = "initial !important"
        // window.print()
        // document.body.style.display = "initial";
      })
    }
  },
}
</script>

<style scoped>

</style>