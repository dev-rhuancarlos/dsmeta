import axios from "axios";
import { toast } from "react-toastify";
import NotificationIcon from "../../assets/img/notification-icon.svg"
import { BASE_URL } from "../../utils/request";
import './style.css';

//A funcao de notificar necessita de um ID, e essa id pode ser passada via PROPS 
//primeiro se declara o tipo Props e passa quais atribustos ele ira receber
type Props = {
  saleId: number;
}

function handleClick(saleId:number){
  axios.get(`${BASE_URL}/sales/${saleId}/notification`)
    .then(response =>{
      toast.info("SMS enviado com sucesso!")
    })
}

//depois passe os atributos via parametro do tipo "Props"
function NotificationButton({ saleId }: Props) {
  return (
    //Agora é só usar o atributo na função chamando o evento
    <div className="dsmeta-red-btn" onClick={() => handleClick(saleId)}>
      <img src={NotificationIcon} alt="Notificar" />
    </div>
  )
}

export default NotificationButton; 