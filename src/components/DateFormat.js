const defaultFormat =  {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: false
    }

export default function DateFormat(props) {
  return (
    new Date(props.date).toLocaleDateString(props.language || 'es', props.format || defaultFormat)
  )
}
