
import { useState } from "react";
import { Button } from "../../../../../components/Button";
import { FormGroup } from "../../../../../components/FormGroup";
import { Input } from "../../../../../components/Input/intex";
import { Modal } from "../../../../../components/Modals";
import api from "../../../../../services/api";
import styles from "./styles.module.scss";

type IProps = {
  handleModalAdd():void;
  modalAdd: boolean;
}

const ModalAdd = ({modalAdd, handleModalAdd}:IProps) => {  
  const [nome, setNome] = useState<string>("");
  const [cnpj,setCnpj] = useState<string>("");
  const [uf, setUf] = useState("")
  const [cidade, setCidade] =useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [rua, setRua] = useState<string>("");

  const [error, setError] = useState<string>("");

  const handeAddEmpresa = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const { data } = await api.post("/empresaterceirizada", {
        nome,
        cnpj,
        uf,
        cidade,
        bairro,
        rua
      });
    
      data && handleModalAdd();
      
    } catch (error:any) {
      setError(error.response.data.message)
    }
  } 

  return (
    <Modal modal={modalAdd} handleModal={handleModalAdd} >
      <div className={styles.modal__content}>
        <div className={styles.modal__header}>
            <h2 className="heading__secondary">Adicionar empresa</h2>
        </div>
        <form className="form" onSubmit={handeAddEmpresa}>
          <FormGroup>
            <Input 
                inputClassName='--border'
                type="text"               
                labelClassName='--black'
                placeholder="Nome"
                value={nome}
                setValue={setNome}
            />
          </FormGroup>
          <FormGroup>
            <Input 
                inputClassName='--border'
                type="text" 
                labelClassName='--black'
                placeholder="CNPJ"
                value={cnpj}
                setValue={setCnpj}
            />
          </FormGroup>
          <FormGroup>
              <Input 
                  inputClassName='--border'
                  type="text" 
                  labelClassName='--black'
                  placeholder="UF"  
                  value={uf}
                  setValue={setUf} 
              />
          </FormGroup>
          <FormGroup>
              <Input 
                  inputClassName='--border'
                  type="text"  
                  labelClassName='--black'
                  placeholder="Cidade"
                  value={cidade}
                  setValue={setCidade}
              />
          </FormGroup>
          <FormGroup>
              <Input 
                  inputClassName='--border'
                  type="text" 
                  labelClassName='--black'
                  placeholder="Bairro"
                  value={bairro}
                  setValue={setBairro}
              />
          </FormGroup>
          <FormGroup>
              <Input 
                  inputClassName='--border'
                  type="text" 
                  labelClassName='--black'
                  placeholder="Rua" 
                  value={rua}
                  setValue={setRua}                
              />
          </FormGroup>
          <br/>
          <br/>
          {error && (
              <FormGroup>
                <span className={styles.span}>{error}</span>
              </FormGroup>
          )}
          <FormGroup>
              <Button
                type="submit"
                className="green"
                title="Cadastrar"
              />
          </FormGroup>
        </form>
      </div>
    </Modal>
  )
}

export { ModalAdd }