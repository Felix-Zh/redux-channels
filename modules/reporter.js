import report from '@hujiang/lego/modules/report';

let reporter = {
  test() {
    report('report_event_id', false);
  }
};

export default reporter;
