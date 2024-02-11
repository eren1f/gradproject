<template>
    <div>
        <router-link to="/anasayfa" @click="scrollToSection('anaSayfa')">Ana Sayfa</router-link>
        <router-link to="/talep_olusturma" @click="scrollToSection('talepOlusturma')">Talep Oluşturma</router-link>
        <router-link to="/program" @click="scrollToSection('program')">Program</router-link>
        <div class="line"></div>
        <div>
            <router-link :to="{ name: 'Ayarlar' }">Ayarlar</router-link>
            <router-link to="#" @click.prevent="logout">Çıkış Yap</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { Auth } from '@/Scripts/Auth';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'NavigationLinks',
    setup() {
        const router = useRouter();

        const scrollToSection = (sectionId: string) => {
            const sectionElement = document.getElementById(sectionId);

            if (sectionId === 'anaSayfa' && router.currentRoute.value.name === 'AnaSayfa') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (sectionElement) {
                sectionElement.scrollIntoView({ behavior: 'smooth' });
                router.push({ name: 'AnaSayfa' });
            }
        };

        const logout = () => {
            const auth = new Auth();
            auth.logoutTokenDeleter();
        };

        return { scrollToSection, logout };
    },
});
</script>