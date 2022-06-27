import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();
  const filetypes = /\.(jpe?g|png|gif)$/i
  const formValidations = {
    image: {
      // TODO REQUIRED, LESS THAN 10 MB AND ACCEPTED FORMATS VALIDATIONS
      required: 'Arquivo Obrigatório',
      validade: {
        lessThen10Mb: files =>
                      files[0].size < 10000000 || 'O arquivo deve ser menor que 10MB',
        acceptedFormats: files =>
                          filetypes.test(files[0].type) || 'Formato inválido. Aceita apenas PNG, JPG e GIF',
      }
    },
    title: {
      // TODO REQUIRED, MIN AND MAX LENGTH VALIDATIONS
      required: 'Título Obrigatório',
      minLenght: {value:2, message: 'Mínimo de 2 caracteres'},
      maxLenght: {value: 20, message:'Máximo de 20 caracteres'},
    },
    description: {
      // TODO REQUIRED, MAX LENGTH VALIDATIONS
      required: 'Descrição Obrigatória',
      maxLenght: {value: 65, message:'Máximo de 65 caracteres'},
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    // TODO MUTATION API POST REQUEST,

    {
      // TODO ONSUCCESS MUTATION
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    trigger,
  } = useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {
      // TODO SHOW ERROR TOAST IF IMAGE URL DOES NOT EXISTS
      if (!imageUrl) {
        toast({
          status: 'error',
          title: 'Erro na imagem',
          description: 'Ocorreu um erro ao tentar fazer upload da imagem'
        })
        return
      }

      // TODO EXECUTE ASYNC MUTATION
      await mutation.mutateAsync(data)

      // TODO SHOW SUCCESS TOAST
      toast ({
        status: 'success',
        title: 'Imagem cadastrada',
        description: 'Imagem cadastrada com sucesso'
      })

    } catch {
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED
      toast ({
        status: 'error',
        title: 'Erro ao cadastrar imagem',
        description: 'Erro ao tentar cadastrar imagem'
      })
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
      reset()
      setLocalImageUrl('')
      setImageUrl('')
      closeModal()
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          // TODO SEND IMAGE ERRORS
          error={errors.image}
          // TODO REGISTER IMAGE INPUT WITH VALIDATIONS
          {...register('image', formValidations.image)}
          />

        <TextInput
          placeholder="Título da imagem..."
          // TODO SEND TITLE ERRORS
          error={errors.title}
          // TODO REGISTER TITLE INPUT WITH VALIDATIONS
          {...register('title', formValidations.title)}
          />

        <TextInput
          placeholder="Descrição da imagem..."
          // TODO SEND DESCRIPTION ERRORS
          error={errors.description}
          // TODO REGISTER DESCRIPTION INPUT WITH VALIDATIONS
          {...register('description', formValidations.description)}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
