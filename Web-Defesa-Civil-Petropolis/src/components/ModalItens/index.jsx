import './styles.css'

export default function ModalComumItem(props) {
  const { tipoMensagem, mensagem, mensagem2, mensagem3, icon, onClose,
    titulo, titulo2, titulo3, titulo4, titulo5,
    tel1, tel2, tel3, dtUserAtt
  } = props;

  return (
    <div className="modal-backgroundCPItem">
      <div className="modalCAItem">
        <div className='tipo-mensagemItem'>
          <div style={{ width: '20px', height: '20px', marginTop: "7px" }}>
            <img src={icon} alt="" style={{ width: '20px', height: '20px' }} />
          </div>
          <p className="mensagemInfoItem" style={{ fontSize: "24px" }}>{tipoMensagem}</p>
        </div>
        <button className="close-buttonItem" onClick={onClose} tabIndex={0} onKeyDown={(e) => { (e.key === "Enter") && (onClick = { onClose }) }}>
          &times;
        </button>
        <hr style={{ marginTop: "16px", marginBottom: "22px" }} />
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'start', justifyContent: 'space-between', height: "94%" }}>

          <div style={{ width: "100%" }}>
            <p>{titulo}</p>
            <textarea
              defaultValue={mensagem}
              cols="30"
              rows="3"
              type="text"
              style={{ resize: 'none', width: '100%' }}
              readOnly
            />
          </div>

          <div style={{ width: "100%" }}>
            <p>{titulo2}</p>
            <textarea
              defaultValue={mensagem2}
              cols="30"
              rows="3"
              type="text"
              style={{ resize: 'none', width: '100%' }}
              readOnly
            />
          </div>

          <div style={{ width: "100%" }}>
            <p>{titulo3}</p>
            {mensagem3 !== undefined && <textarea
              defaultValue={mensagem3}
              cols="30"
              rows="3"
              type="text"
              style={{ resize: 'none', width: '100%' }}
              readOnly
            />}
          </div>

          <p>{titulo4}</p>
          <p>{titulo5}</p>
          <div style={{ marginTop: "6px" }}>

            <p>{tel1}</p>
            <p>{tel2}</p>
            <p>{tel3}</p>
          </div>

          <p style={{ textAlign: "end" }}>{dtUserAtt}</p>
        </div>
      </div>
    </div>
  )
}

