const agendar = async () => {
  const res = await fetch('/api/agendar', { method:'POST', body: JSON.stringify({servico: servico.nome, hora}) })
  const {whatsapp} = await res.json()
  window.open(whatsapp, '_blank')
  setConfirm(true)
}