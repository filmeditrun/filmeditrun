---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
import Footer from '../components/Footer.astro';
---

<Layout title="About Us - Filmeditrun.co.uk">
    <Navbar />

    <main class="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div class="space-y-6">
                <span class="text-accentBlue font-bold tracking-widest uppercase text-sm">Cinematic Creatives Identity</span>
                <h1 class="text-4xl md:text-6xl font-black uppercase tracking-tight">Mastering the Art of Visual Storytelling</h1>
                <p class="text-mutedText text-lg leading-relaxed">
                    Filmeditrun was born out of a passion for high-end cinematic post-production. By transitioning to a modern static architecture, we ensure lightning-fast performance while keeping our content fully managed and editable.
                </p>
            </div>
            <div class="relative">
                <div class="absolute -inset-2 bg-gradient-to-r from-accentBlue to-blue-600 rounded-2xl blur-lg opacity-30"></div>
                <div class="relative glass-card p-4 rounded-2xl overflow-hidden">
                    <div class="h-80 rounded-xl bg-[url('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center"></div>
                </div>
            </div>
        </div>
    </main>

    <Footer />
</Layout>