import { useEffect, useState } from "react";
import axios from 'axios';
import {
    RotaCcw,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';

export default function Devolucao (){
    const [itens, setItens] = useState([]);
    const [ItemSelecionado, setItemSelecionado] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState('');

    async function carregarItem() {
        try{
            const token = localStorage.getItem('token');
            const response = await axios.get(
                'http://localhost:3001/itens',
                {
                    headers: {
                        Authorization: 'Bearer ${token}'
                    }
                }
            )
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        carregarItem();
    }, [])

    async function realizarDevolucao(e) {
        e.preventDefault()

        if(!itemSelecionado){
            setMensagem ('Selecione um item')
            setTipoMensagem('erro')
            return
        }

        try{
            const token = localStorage.getItem('token')

            await axios.get(
                'http://localhost:3001/devolver',
                {
                    item_id: itemSelecionado
                },
                {
                    hearders: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setMensagem('Item devolvido com sucesso!')
            setTipoMensagem('sucesso');
            setItemSelecionado('');
            carregarItens();
        }catch(error){
            console.log(error)
            setMensagem(
                error.response?.data?.msg || 'Erro ao realizar devolução'
            )

            setTipoMensagem ('erro')

        }
        
    }

    return(
        <div className='
            min-h-screen
            bg-gradient-to-br
            from-slate-100
            via-green-50
            flex
            items-center
            justify-center
            p-6'
        >
            <div className='
                w-full
                max-w-x1
                bg-white
                rounded-3x1
                shadow-2x1
                overflow-hidden
                border
                border-gray-100'
            >
                <div className='
                    bg-gradient-to-r
                    from-green-600
                    to-emerald-500
                    p-8
                    text-white'
                >
                    <div className='
                        flex
                        items-center
                        gap-4'                        
                    >
                        <div className='bg-white/20 p-4 rounded-2x1'>
                            <RotaCcw size=(35)/>
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    )
}
    