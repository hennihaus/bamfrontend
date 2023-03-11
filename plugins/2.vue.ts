import VueDOMPurifyHTML from 'vue-dompurify-html';
import CKEditor from "@ckeditor/ckeditor5-vue";

export default defineNuxtPlugin(({vueApp}) => {
    const PLACEHOLDER_IMAGE_PATH = "/img/placeholder.png"

    const addPlaceholderImage = (el: HTMLImageElement, binding: any) => {
        el.src = PLACEHOLDER_IMAGE_PATH;
        binding.instance.thumbnailUrl = PLACEHOLDER_IMAGE_PATH;
    };

    vueApp.directive("base-image-error", {
        created: (el: HTMLImageElement, binding: any) => {
            el.addEventListener("error", () => addPlaceholderImage(el, binding));
        },
        unmounted: (el: HTMLImageElement, binding: any) => {
            el.removeEventListener("error", () => addPlaceholderImage(el, binding));
        }
    });

    vueApp.use(VueDOMPurifyHTML);
    vueApp.use(CKEditor);
});