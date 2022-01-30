/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileInput, FileInputProps, FormField } from 'grommet';

interface CustonFileInput extends FileInputProps {
  label: string;
  name: string;
  setFile: (file: File | null) => void;
}

export const CustonFileInput: React.FC<CustonFileInput> = (props) => {
  const { label, name, setFile, ...rest } = props;

  return (
    <FormField label={label} htmlFor={`id-${name}`}>
      <FileInput
        id={`id-${name}`}
        name={name}
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          } else {
            setFile(null);
          }
        }}
        multiple={false}
        messages={{
          browse: 'Navegador',
          dropPrompt: 'Solte o arquivo aqui ou',
          dropPromptMultiple: 'Solte os arquivos aqui ou',
          files: 'arquivos',
          remove: 'remover',
          removeAll: 'remover todos',
          maxFile: 'Anexe no máximo apenas {max} arquivos.',
        }}
        {...rest}
      />
    </FormField>
  );
};
