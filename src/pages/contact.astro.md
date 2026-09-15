---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
import Footer from '../components/Footer.astro';
import ContactForm from '../components/ContactForm.astro';
---

<Layout title="Contact - Filmeditrun.co.uk">
    <Navbar />

    <main class="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <div class="text-center mb-12 space-y-3">
            <span class="text-accentBlue font-bold tracking-widest uppercase text-sm">Get In Touch</span>
            <h1 class="text-4xl md:text-5xl font-black uppercase tracking-tight">Start Your Project</h1>
            <p class="text-mutedText">Complete our interactive brief below to connect with our creative team.</p>
        </div>

        <ContactForm />
    </main>

    <Footer />
</Layout>