<script>
import Cookies from 'js-cookie';
import { backendUrl } from '../urls';

const defaultOptions = {
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json'
  },
}

export default {
  name: 'ApiRequests',
  methods: {
    getRequest(route, token) {
      let options = {
        ...defaultOptions,
        method: 'GET'
      }

      if (token === true) {
        token = Cookies.get('auth-token');
        options.headers['auth-token'] = token;
      }
      
      return fetch(backendUrl + route, options);
    },
    postRequest(route, body, token) {
      let options = {
        ...defaultOptions,
        method: 'POST'
      }

      if (body) {
        options['body'] = JSON.stringify(body);
      }

      if (token === true) {
        token = Cookies.get('auth-token');
        options.headers['auth-token'] = token;
      }

      return fetch(backendUrl + route, options);
    }
  }
}
</script>