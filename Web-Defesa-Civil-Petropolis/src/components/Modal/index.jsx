import './styles.css'

export default function ModalComum(props) {
  const { tipoMensagem, mensagem, icon, onClose, conf } = props;

  return (
    <div className="modal-backgroundCP">
      <div className="modalCA">
        <div className='tipo-mensagem'>
          <div style={{ width: '20px', height: '20px', marginTop: "7px" }}>
            <img src={icon} alt="" style={{ width: '20px', height: '20px' }} />
          </div>
          <label className="mensagemInfo" style={{ fontSize: "1rem" }}>{tipoMensagem}</label>
        </div>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <hr style={{ marginTop: "16px", marginBottom: "22px" }} />
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'start' }}>
          <label className='mensagem-modal'>{mensagem}</label>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: "20px" }}>
            {conf ?
              <div style={{ width: "100%", display: 'flex', justifyContent: 'flex-end' }}>
                <button className='botaoModal' onClick={() => conf(true)}>CONFIRMAR</button>
                <button className='botaoModal' onClick={() => conf(false)}>CANCELAR</button>
              </div>
              :
              <button className='botaoModal' onClick={onClose}>OK</button>
            }

          </div>
        </div>
      </div>
    </div>
  )
}

