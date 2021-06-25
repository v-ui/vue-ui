const base = {
    default: { title: 'Default', color: 'primary', icon: 'record-circle-fill' },
    success: { title: 'Success', color: 'success', icon: 'check-circle-fill' },
    warning: { title: 'Warning', color: 'warning', icon: 'exclamation-triangle-fill'},
    error: { title: 'Error', color: 'danger', icon: 'x-circle-fill'},
    danger: { title: 'Danger', color: 'danger', icon: 'exclamation-circle-fill'},
}

const message = {
  ...base,
  system: { title: 'System Info', color: 'info', icon: 'info-lg' },
  info: { title: 'Info', color: 'info', icon: 'info-circle-fill' },
  issue: { title: 'Issue', color: 'secondary', icon: 'question-circle-fill' },
}

const method = {
  ...base,
}

export default {
  base,
  message,
  method,
}
