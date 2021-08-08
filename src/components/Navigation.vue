<template>
    <div >
         <v-app-bar app color="primary" dark elevation="0">
            <v-app-bar-nav-icon  @click.stop="sidebarMenu = !sidebarMenu"></v-app-bar-nav-icon>
            <h3 class="font-weight-bold">Dashboard</h3>
            <v-spacer></v-spacer>

            <div v-if="!currentUser" class="ml-auto">
                <router-link to="/login" class="">
                    <v-btn text elevation="0">
                        <v-icon
                            dark
                            left
                            >
                                mdi-login
                            </v-icon>
                        Login
                    </v-btn>
                </router-link>
                <!-- <router-link to="/register" class="">
                    <v-btn text elevation="0">
                        Register
                    </v-btn>
                </router-link> -->
            </div>

            <div  class="ml-auto">
                <!-- <router-link to="/profile" class="">
                    <v-btn text v-if="currentUser" elevation="0"> 
                        {{ currentUser.username }}
                    </v-btn>
                </router-link> -->
                <v-btn text elevation="0" @click.prevent="logOut">
                    <v-icon
                            dark
                            left
                            >
                                mdi-logout
                            </v-icon>
                    Logout
                </v-btn>
            </div>

            <template v-if="currentUser" v-slot:extension>
                <v-tabs align-with-title>
                    <v-tab to="/home">Home</v-tab>
                    <v-tab to="/table">Table</v-tab>
                    <v-tab v-if="showAdminBoard" to="/admin">Admin Board</v-tab>
                    <v-tab v-if="showModeratorBoard" to="/mod">Moderator Board</v-tab>
                    <v-tab v-if="currentUser" to="/user">User</v-tab>
                </v-tabs>
            </template>
        </v-app-bar>
   
        <v-navigation-drawer
            v-model="sidebarMenu" 
            app
            floating
            :permanent="sidebarMenu"
            :mini-variant.sync="mini"
            >
            <v-list dense color="primary" dark>
                <v-list-item>
                    <v-list-item-action>
                        <v-icon @click.stop="sidebarMenu = !sidebarMenu">mdi-chevron-left</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            <h3 class="font-weight-bold">Frendy</h3>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-list-item class="px-2" @click="toggleMini = !toggleMini">
                <v-list-item-avatar>
                    <v-icon>mdi-account-outline</v-icon>
                </v-list-item-avatar>
                <v-list-item-content v-if="currentUser" class="text-truncate">
                   {{currentUser.username}}
                </v-list-item-content>
                 <v-list-item-content v-else class="text-truncate">
                   User
                </v-list-item-content>
                <v-btn icon small>
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
            </v-list-item>
            <v-divider></v-divider>
            <v-list>
                <v-list-item v-for="item in items" :key="item.title" link :to="item.href">
                    <v-list-item-icon>
                        <v-icon color="primary">{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="primary--text">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>  
</template>

<script>

export default {
    name: 'Navigation',
    
    data() {
        return{
            sidebarMenu: true,
            toggleMini: false,
            items: [
                { title:"Home", href:"/home", icon:"mdi-home-outline" },
                { title:"Profile", href:"/profile", icon:"mdi-face-profile" },
                { title:"Table", href:"/table", icon:"mdi-file-document-box-outline" },
                { title:"Settings", href:"/settings", icon:"mdi-settings-outline" },
            ],
        }
    },
    computed: {
        mini: {
            get() {
                return (this.$vuetify.breakpoint.smAndDown) || this.toggleMini
            },
            set(value){
                this.toggleMini = value
            }
        },
        currentUser() {
        return this.$store.state.auth.user;
        },
        showAdminBoard() {
        if (this.currentUser && this.currentUser.roles) {
            console.log('current user from navigation: ', this.currentUser)
            return this.currentUser.roles.includes('ROLE_ADMIN');
        }
        return false;
        },
        showModeratorBoard() {
        if (this.currentUser && this.currentUser.roles) {
            return this.currentUser.roles.includes('ROLE_MODERATOR');
        }
        return false;
        }
    },
    methods: {
        logOut() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/login');
        }
    }
};
</script>