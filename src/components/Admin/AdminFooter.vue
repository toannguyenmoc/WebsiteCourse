<template>
    
        <footer class="footer">
            <div class="row align-items-center justify-content-xl-between container-fluid">
                <div class="col-xl-6">
                    <div class="copyright text-center text-xl-left text-muted">
                        &copy; 2018 <RouterLink to="" class="font-weight-bold ml-1"
                            target="_blank">Creative Tim</RouterLink>
                    </div>
                </div>
                <div class="col-xl-6">
                    <ul class="nav nav-footer justify-content-center justify-content-xl-end">
                        <li class="nav-item">
                            <RouterLink to="" class="nav-link" target="_blank">Creative Tim</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink to="" class="nav-link" target="_blank">About Us</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink to="" class="nav-link" target="_blank">Blog</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink to="" class="nav-link" target="_blank">MIT License</RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style lang="scss" scoped></style>