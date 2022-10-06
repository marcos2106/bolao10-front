import BaseInput from '@/components/framework/Inputs/BaseInput.vue';
import BaseDropdown from '@/components/framework/BaseDropdown.vue';
import Card from '@/components/framework/Cards/Card.vue';
import Modal from '@/components/framework/Modal.vue';
import StatsCard from '@/components/framework/Cards/StatsCard.vue';
import BaseButton from '@/components/framework/BaseButton.vue';
import Badge from '@/components/framework/Badge.vue';
import RouteBreadcrumb from '@/components/framework/Breadcrumb/RouteBreadcrumb';
import BaseCheckbox from '@/components/framework/Inputs/BaseCheckbox.vue';
import BaseSwitch from '@/components/framework/BaseSwitch.vue';
import BaseRadio from "@/components/framework/Inputs/BaseRadio";
import BaseProgress from "@/components/framework/BaseProgress";
import BasePagination from "@/components/framework/BasePagination";
import BaseAlert from "@/components/framework/BaseAlert";
import BaseNav from "@/components/framework/Navbar/BaseNav";
import BaseHeader from '@/components/framework/BaseHeader';
import { Input, Tooltip, Popover } from 'element-ui';
import JwPagination from 'jw-vue-pagination';
import loader from "vue-ui-preloader";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    Vue.component(Badge.name, Badge);
    Vue.component(BaseAlert.name, BaseAlert);
    Vue.component(BaseButton.name, BaseButton);
    Vue.component(BaseCheckbox.name, BaseCheckbox);
    Vue.component(BaseHeader.name, BaseHeader);
    Vue.component(BaseInput.name, BaseInput);
    Vue.component(BaseDropdown.name, BaseDropdown);
    Vue.component(BaseNav.name, BaseNav);
    Vue.component(BasePagination.name, BasePagination);
    Vue.component(BaseProgress.name, BaseProgress);
    Vue.component(BaseRadio.name, BaseRadio);
    Vue.component(BaseSwitch.name, BaseSwitch);
    Vue.component(Card.name, Card);
    Vue.component(Modal.name, Modal);
    Vue.component(StatsCard.name, StatsCard);
    Vue.component(RouteBreadcrumb.name, RouteBreadcrumb);
    Vue.component('jw-pagination', JwPagination);
    Vue.component(Input.name, Input);
    Vue.use(Tooltip);
    Vue.use(Popover);
    Vue.use(loader);
    Vue.use(Antd);
  }
};

export default GlobalComponents;
