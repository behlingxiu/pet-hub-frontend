<script>

    import "../app.css";
    import Header from "../components/common/+header.svelte";
    import Footer from "../components/common/+footer.svelte";
    import Alerts from '../components/Alert.svelte';

</script>

<Header />
<main>
    <Alerts/>
    <slot/>
</main>
<Footer />
