import '@/polyfills';
import Notifications from '@/components/framework/NotificationPlugin';
import VeeValidate from 'vee-validate';
import GlobalComponents from './globalComponents';
import GlobalDirectives from './globalDirectives';
import SideBar from '@/components/framework/SidebarPlugin';

// element ui language configuration
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
locale.use(lang);

// asset imports
import '@/assets/sass/argon.scss';
import '@/assets/css/nucleo/css/nucleo.css';

export default {
  install(Vue) {
    Vue.use(GlobalComponents);
    Vue.use(GlobalDirectives);
    Vue.use(SideBar);
    Vue.use(Notifications);
    Vue.use(VeeValidate, {
      fieldsBagName: 'veeFields',
      classes: true,
      validity: true,
      classNames: {
        valid: 'is-valid',
        invalid: 'is-invalid'
      }
    });
  }
};
