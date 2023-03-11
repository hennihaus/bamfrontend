const PAGE_BORDER_HEIGHT_IN_PIXEL = 30;
const HEADER_HEIGHT_IN_PIXEL = 50;
const PAGINATION_NUMBERS_HEIGHT_IN_PIXEL = 52;
const ITEM_HEIGHT_IN_PIXEL = 95;

export const useWindowSize = () => {
    const width = ref<number>(window.innerWidth);
    const height = ref<number>(window.innerHeight);

    const update = () => {
        width.value = window.innerWidth;
        height.value = window.innerHeight;
    }

    onMounted(() => window.addEventListener("resize", update));
    onUnmounted(() => window.addEventListener("resize", update));

    return {
        width,
        height,
    };
}

export const useItemsPerWindowCalculator = () => {
    const {height} = useWindowSize();

    return {
        itemsPerWindow: computed(
            () => Math.floor((height.value - (PAGE_BORDER_HEIGHT_IN_PIXEL + HEADER_HEIGHT_IN_PIXEL + PAGINATION_NUMBERS_HEIGHT_IN_PIXEL)) / ITEM_HEIGHT_IN_PIXEL),
        )
    };
};