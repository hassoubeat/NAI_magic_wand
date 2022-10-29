import { ref, computed } from "vue";
 
export function useEnhancer(props) {
  const { metadataPng } = props;

  const metadataPngString = computed(() => {
    return JSON.stringify(metadataPng);
  })

  const visibleDetail = ref(false);

  const toggleVisibleDetail = () => {
    visibleDetail.value = !visibleDetail.value;
  }

  return {
    metadataPngString,
    visibleDetail,
    toggleVisibleDetail
  }
}