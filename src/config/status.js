const base = {
    default: { title: 'Default', color: 'primary', icon: 'far fa-dot-circle' },
    success: { title: 'Success', color: 'success', icon: 'far fa-check-circle' },
    warning: { title: 'Warning', color: 'warning', icon: 'far fa-exclamation-triangle'},
    error: { title: 'Error', color: 'danger', icon: 'far fa-times-circle'},
    danger: { title: 'Danger', color: 'danger', icon: 'far fa-exclamation-circle'},
}

const message = {
  ...base,
  system: { title: 'System Info', color: 'info', icon: 'far fa-cog' },
  info: { title: 'Info', color: 'info', icon: 'far fa-info-circle' },
  issue: { title: 'Issue', color: 'warning', icon: 'far fa-question-circle' },
}

const method = {
  ...base,
}

export default {
  base,
  message,
  method,
}
