import { expect } from 'chai';
import store from '@/store';
import { mockAxios } from '../../setup';
import { ruleYaml } from '../../mockData/alert/ruleDataMattermost.js';

mockAxios.onGet('/api/rules/test123').reply(200, { yaml: ruleYaml });

describe('Mattermost YAML parsing', () => {
  it('renders the correct yaml', async () => {
    await store.dispatch('config/load', { type: 'rules', path: 'test123' });

    let yaml = store.getters['config/yaml']();

    let expected = `__praeco_full_path: "test123"
__praeco_query_builder: "{\\"query\\":{\\"logicalOperator\\":\\"all\\",\\"children\\":[]}}"
alert:
  - "mattermost"
alert_subject: "this is a test subject"
alert_text: "this is a test body"
alert_text_type: "alert_text_only"
doc_type: "syslog"
filter:
  - query:
      query_string:
        query: "@timestamp:*"
generate_kibana_discover_url: false
import: "BaseRule.config"
index: "hannibal-*"
is_enabled: false
match_enhancements: []
mattermost_attach_kibana_discover_url: false
mattermost_channel_override: "#elastalert-debugging"
mattermost_kibana_discover_color: "#ec4b98"
mattermost_kibana_discover_title: "Discover in Kibana"
mattermost_msg_color: "danger"
mattermost_username_override: "elastalert"
name: "test123"
num_events: 10000
realert:
  minutes: 5
terms_size: 50
timeframe:
  minutes: 5
timestamp_field: "@timestamp"
timestamp_type: "iso"
type: "frequency"
use_count_query: true
use_strftime_index: false
`;

    return expect(yaml).to.equal(expected);
  });
});
