import Chart from 'chart.js';
import { initGlobalOptions } from "@/components/framework/Charts/config";
export default {
  mounted() {
    initGlobalOptions(Chart);
  }
}
