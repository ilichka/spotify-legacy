import styled from "styled-components";
import Select from "react-select";
import {useState} from "react";
import {useStore} from "../store/useStore";
import {toast} from "react-toastify";

const InputLabel = styled.div`
  font-weight: 400;
  font-size: 24px;
  line-height: 38px;
  margin: 30px 0 15px 0;
  color: #FFFFFF;
`

const ModalTitle = styled.div`
  font-weight: 500;
  font-size: 40px;
  line-height: 49px;
`

const ModalRow = styled.div`
  display: flex;
  flex-direction: column;
`

const ModalInput = styled.input`
  background: #313131;
  border: 0;
  color: white;
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  width: 100%;
  padding: 4px 10px;
  border-radius: 5px;

  :focus-visible {
    outline: 0;
  }
`

const ModalFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: auto;
`

const SecondaryButton = styled.div`
  font-weight: 400;
  font-size: 24px;
  line-height: 38px;
  margin-bottom: 25px;
  color: #FFFFFF;
`

const SelectSector = styled.div`
  display: flex;
  gap: 20px
`

const StyledSelect = styled(Select)`
  .select__control {
    background: #313131;
    border: 0;
  }

  .select__single-value {
    color: white;

  }

  .select__menu-list {
    background: #313131;

  }

  .select__option {
    background: #313131;

  }

  ${({$year}) => $year && 'width: 100%'};
`

const ModalButton = styled.button`
  background: transparent;
  font-weight: 600;
  font-size: 28px;
  line-height: 45px;
  color: #7DFF5D;
  border: 2.5px solid #7DFF5D;
  border-radius: 30px;
  min-height: 80px;
  width: 100%;
`

const monthArray = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

const years = Array.from({length: 104}, (_, index) => ({label: 1920 + index, value: 1920 + index}));
const months = Array.from({length: 12}, (_, index) => ({label: monthArray[index], value: monthArray[index]}));
const days = Array.from({length: 31}, (_, index) => ({label: index + 1, value: index + 1}));

export const SignInModal = ({loginCb, closeModal}) => {
    const [stage, setStage] = useState('first');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [sex, setSex] = useState('');
    const [secondPassword, setSecondPassword] = useState('');

    const {auth} = useStore();

    const register = async () => {
        let date
        if(password !== secondPassword) {
            toast.error('Пароли должны совпадать')
        } else {
            date = day && month && year ? `${day}.${monthArray.indexOf(month)}.${year}` : 'Возраст не указан'
            console.log(email,password, date, sex)
        }
        await auth.register(email,password, date, sex)
        if(auth.loggedIn) {
            toast.success("Вы успешно зарегестрированы");
            closeModal()
        } else {
            toast.error("Заполните пустые поля и убедитесь что уже не зарегестрированы!");
        }
    }

    return <><ModalTitle>Регистрация</ModalTitle>
        <ModalRow>
            <InputLabel >Электронная почта</InputLabel>
            <ModalInput onChange={(e)=>setEmail(e.target.value)}/>
        </ModalRow>
        {stage === 'first' && <><ModalRow>
            <InputLabel>Дата рождения</InputLabel>
            <SelectSector>
                <StyledSelect
                    classNamePrefix="select"
                    name="color"
                    options={days}
                    placeholder='День'
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            minWidth: '120px',
                        }),
                    }}
                    onChange={(e)=>setDay(e.value)}
                />
                <StyledSelect
                    classNamePrefix="select"
                    name="color"
                    options={years}
                    placeholder='Год'
                    $year={true}
                    onChange={(e)=>setYear(e.value)}
                />
                <StyledSelect
                    classNamePrefix="select"
                    name="color"
                    options={months}
                    placeholder='Месяц'
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            minWidth: '155px',
                        }),
                    }}
                    onChange={(e)=>setMonth(e.value)}
                />
            </SelectSector>
        </ModalRow>
            <ModalRow>
                <InputLabel>Пол</InputLabel>
                <StyledSelect
                    classNamePrefix="select"
                    name="color"
                    placeholder='Пол'
                    options={[{label: 'Мужской', value: 'Мужской'}, {label: 'Женский', value: 'Женский'},]}
                    onChange={(e)=>setSex(e.value)}
                />
            </ModalRow>
            <ModalFooter>
                <SecondaryButton onClick={loginCb}>Войти</SecondaryButton>
                <ModalButton onClick={()=>setStage('second')}>Далее</ModalButton>
            </ModalFooter></>
        }
        {stage === 'second' && <><ModalRow>
            <InputLabel>Пароль</InputLabel>
            <ModalInput onChange={(e)=>setPassword(e.target.value)}/>
        </ModalRow>
            <ModalRow>
                <InputLabel>Повторить пароль</InputLabel>
                <ModalInput onChange={(e)=>setSecondPassword(e.target.value)}/>
            </ModalRow>
            <ModalFooter>
                <SecondaryButton onClick={loginCb}>Войти</SecondaryButton>
                <ModalButton onClick={register}>Зарегистрироваться</ModalButton>
            </ModalFooter>
        </>
        }
    </>
}