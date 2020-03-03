<template>
    <div
        id='sign-in-dropdown'
        :class="{'show-dropdown': showDropdown}">
        <button
            v-if="!signedIn"
            class="dropbtn border-left"
            @click="handleDropwdownClicked()">
            <i class="material-icons" style="font-size:60px">arrow_drop_down</i>Sign In
        </button>
        <button
            v-else
            class="dropbtn border-left"
            @click="handleSignOutClicked()">
            <i class="material-icons" style="font-size:40px">exit_to_app</i>Sign Out
        </button>
        <div
            v-if="!signedIn"
            class="dropdown-content">
            <SignInForm />
        </div>
    </div>
</template>

<script>
import { bus } from '@/main';
import SignInForm from '@/components/SignInForm.vue';

export default {
    name: 'SignInDropdown',
    components: {
        SignInForm,
    },
    data() {
        return {
            signedIn: false,
            showDropdown: false,
        };
    },
    methods: {
        handleDropwdownClicked() {
            this.showDropdown = !this.showDropdown;
            bus.$emit('signInOpened');
        },
        closeDropdown() {
            this.showDropdown = false;
        },
        handleSignInSuccess() {
            this.signedIn = true;
        },
        handleSignOutSuccess() {
            this.signedIn = false;
        },
        handleSignOutClicked() {
            bus.$emit('attemptUserSignOut');
        },
    },
    mounted() {
        bus.$on('addArticleOpened', this.closeDropdown);
        bus.$on('signInSuccess', this.handleSignInSuccess);
        bus.$on('signOutSuccess', this.handleSignOutSuccess);
    },
};
</script>

<style lang='scss'>
#sign-in-dropdown {
    // position: relative;
    display: inline-block;
    border-left: 1px solid white;

    button {
        background-color: #42b983;
        color: white;
        padding: 0px 16px;
        font-size: 24px;
        font-weight: 600;
        border: none;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 200px;
        transition: 0.3s;

        i {
            transition: 0.4s;
        }

        &:hover {
            background-color: #56c291;
            cursor: pointer;
        }
    }

    .dropdown-content {
        display: none;
        position: absolute;
        right: 0px;
        width: 400px;
        padding-top: 20px;
        padding-bottom: 60px;
        padding-left: 40px;
        padding-right: 40px;
        background-color: #e1fcf1;
        color: #34495e;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }

    &.show-dropdown {
        .dropdown-content {
            display: block;
        }
        .dropbtn {
            background-color: #56c291;

            i {
                transform: rotate(180deg);
            }
        }
    }
}

</style>
