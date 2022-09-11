import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Sale } from "../../models/sale";
import { BASE_URL } from "../../utils/request";
import { formatedDate } from "../../utils/Utils";
import NotificationButton from "../NotificationButton";

import "./style.css";

function SalesCard() {

    //data inicial de 1 ano atras
    const min = new Date(new Date().setDate(new Date().getDate() - 365));

    //data final dia de hoje
    const max = new Date();

    //Passar valor inicial para o estado
    const [minDate, setMinDate] = useState(min);
    const [maxDate, setMaxDate] = useState(max);

    //Estado para armazenar as vendas
    //useState pode ser tipado para receber certo valor
    //useState recebe valor inicial entre parenteses, no caso lista vazia, dataInicial, dataFinal
    const [sales, setSales] = useState<Sale[]>([]);

    //useEffect, executa a funcao quando o componente X for montado e quando ele for alterado
    useEffect(() => {
        axios.get(`${BASE_URL}/sales`).then(response => {
            setSales(response.data.content);
            console.log(response.data.content);
            
        })
    }, [])

    return (
        <div className="dsmeta-card">
            <h2 className="dsmeta-sales-title">Vendas</h2>
            <div>
                <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={minDate}
                        onChange={(date: Date) => setMinDate(date)}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={maxDate}
                        onChange={(date: Date) => setMaxDate(date)}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
            </div>

            <div>
                <table className="dsmeta-sales-table">
                    <thead>
                        <tr>
                            <th className="show992">ID</th>
                            <th className="show576">Data</th>
                            <th>Vendedor</th>
                            <th className="show992">Visitas</th>
                            <th className="show992">Vendas</th>
                            <th>Total</th>
                            <th>Notificar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(sale => {
                            return (
                                //Exigencia do React
                                //Quando for renderizerizer uma lista, cada objeto deve ter um "key" unica
                                <tr key={sale.id}>
                                    <td className="show992">{sale.id}</td>
                                    <td className="show576">{formatedDate(sale.date)}</td>
                                    <td>{sale.sallerName}</td>
                                    <td className="show992">{sale.visited}</td>
                                    <td className="show992">{sale.deals}</td>
                                    <td>R$ {sale.amount.toFixed(2)}</td>
                                    <td>
                                        <div className="dsmeta-red-btn-container">
                                            <NotificationButton />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>

                </table>
            </div>

        </div>
    )
}

export default SalesCard;