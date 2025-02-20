package com.springAPI.springAPI.services;

import com.springAPI.springAPI.dtos.CurriculoRecordDto;
import com.springAPI.springAPI.dtos.FormacaoDto;
import com.springAPI.springAPI.models.*;
import com.springAPI.springAPI.repositories.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CurriculoService {

    @Autowired
    private final CurriculoRepository curriculoRepository;
    @Autowired
    private final EnderecoRepository enderecoRepository;
    @Autowired
    private final ExperienciaRepository experienciaRepository;

    @Autowired
    private final FormacaoRepository formacaoRepository;

    @Autowired
    private final GraduacaoRepository graduacaoRepository;

    private final InfoAdicionalRepository infoAdicionalRepository;


    public CurriculoService(CurriculoRepository curriculoRepository, EnderecoRepository enderecoRepository, ExperienciaRepository experienciaRepository, InfoAdicionalRepository infoAdicionalRepository, FormacaoRepository formacaoRepository, GraduacaoRepository graduacaoRepository) {
        this.curriculoRepository = curriculoRepository;
        this.enderecoRepository = enderecoRepository;
        this.experienciaRepository = experienciaRepository;
        this.infoAdicionalRepository = infoAdicionalRepository;
        this.formacaoRepository = formacaoRepository;
        this.graduacaoRepository = graduacaoRepository;
    }

    @Transactional
    public List<Curriculo> buscarTodosOsCurriculos() {

        return curriculoRepository.findAll();
    }

    @Transactional
    public Curriculo buscarCurriculo(Long id) {
        return curriculoRepository.findById(id).get();
    }

    @Transactional
    public Curriculo cadastrarCurriculo(CurriculoRecordDto curriculoRecordDto) {

        Curriculo curriculo = new Curriculo();

        // Salvando o endereço primeiro para gera o id
        Endereco endereco = curriculoRecordDto.endereco();
        endereco = enderecoRepository.save(endereco);
        curriculo.setEndereco(endereco);

        // Setando as informações do Body no objeto curriculo
        curriculo.setNome(curriculoRecordDto.nome());
        curriculo.setTelefone(curriculoRecordDto.telefone());
        curriculo.setFoto(curriculoRecordDto.foto());

        if (curriculoRecordDto.infoAdicional() != null) {
            // Relacionando o curriculo a infoAdicional
            InfoAdicional infoAdicional = curriculoRecordDto.infoAdicional();
            infoAdicional.setCurriculo(curriculo);

            curriculo.setInfoAdicional(infoAdicional);
        }

        curriculoRepository.save(curriculo);

        if (curriculoRecordDto.experiencias() != null) {
            Set<Experiencia> experiencias = curriculoRecordDto.experiencias();
            curriculo.setExperiencias(experiencias);

            // Salvando as tabelas relacionadas que dependem da criação do currículo
            for (Experiencia exp : experiencias) {
                exp.setCurriculo(curriculo);
                experienciaRepository.save(exp);

            }
        }

       if (curriculoRecordDto.formacoes() != null) {
           Set<Formacao> formacoes = new HashSet<>();

           for (FormacaoDto formacaoDto : curriculoRecordDto.formacoes()) {
               Formacao formacao = new Formacao();

               // Buscar a graduação pelo ID
               Graduacao graduacao = graduacaoRepository.findById(formacaoDto.idGraduacao()).orElseThrow(() -> new RuntimeException("Graduação não encontrada"));

               formacao.setGraduacao(graduacao);

               formacao.setInstituicao(formacaoDto.instituicao());
               formacao.setCurso(formacaoDto.curso());
               formacao.setAnoInicio(formacaoDto.anoInicio());
               formacao.setAnoTermino(formacaoDto.anoTermino());
               formacao.setCurriculo(curriculo);
               formacoes.add(formacao);
               formacaoRepository.save(formacao);

           }


           curriculo.setFormacoes(formacoes);
       }


        return curriculo;

    }

    @Transactional
    public Curriculo atualizarCurriculo(Long id, CurriculoRecordDto novoCurriculo) {

        // Buscando o currículo na base de dados
        Curriculo curriculo = curriculoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Currículo não encontrado"));


        // Atualizando endereço
        if (novoCurriculo.endereco() != null) {
            Endereco endereco = curriculo.getEndereco();
            if (endereco == null) endereco = new Endereco();

            endereco.setLogradouro(novoCurriculo.endereco().getLogradouro());
            endereco.setNumero(novoCurriculo.endereco().getNumero());
            endereco.setBairro(novoCurriculo.endereco().getBairro());
            endereco.setCidade(novoCurriculo.endereco().getCidade());
            endereco.setCep(novoCurriculo.endereco().getCep());
            endereco.setEstado(novoCurriculo.endereco().getEstado());

            endereco = enderecoRepository.save(endereco);
            curriculo.setEndereco(endereco);
        }


        // Setand as informações do currículo
        curriculo.setNome(novoCurriculo.nome());
        curriculo.setTelefone(novoCurriculo.telefone());
        curriculo.setFoto(novoCurriculo.foto());


        // Atualizando info adicional
        if (novoCurriculo.infoAdicional() != null) {

            InfoAdicional novoInfo = novoCurriculo.infoAdicional();

            InfoAdicional info = curriculo.getInfoAdicional();

            if (info == null) {
                info = new InfoAdicional();
            }

            info.setLinkedin(novoInfo.getLinkedin());
            info.setGithub(novoInfo.getGithub());
            info.setInstagram(novoInfo.getInstagram());
            info.setPortfolio(novoInfo.getPortfolio());

            curriculo.setInfoAdicional(info);


        }

        if (novoCurriculo.experiencias() != null) {

            // Deleta as experiencias antes de inserir novas
            experienciaRepository.deleteAll(curriculo.getExperiencias());

            Set<Experiencia> novasExperiencias = novoCurriculo.experiencias();

            for (Experiencia novaExperiencia : novasExperiencias) {
                novaExperiencia.setCurriculo(curriculo);  // Relaciona com o currículo
            }

            // Insere as novas experiências do currículo
            curriculo.setExperiencias(novasExperiencias);
        }

        curriculoRepository.save(curriculo);

        if (novoCurriculo.formacoes() != null) {

            formacaoRepository.deleteAll(curriculo.getFormacoes());

            Set<FormacaoDto> novasFormacoes = novoCurriculo.formacoes();

            Set<Formacao> formacoes = new HashSet<>();

            for (FormacaoDto novaFormacao : novasFormacoes) {

                // Buscar a graduação pelo ID
                Graduacao graduacao = graduacaoRepository.findById(novaFormacao.idGraduacao()).orElseThrow(() -> new EntityNotFoundException("Graduação não encontrada"));

                Formacao formacao = new Formacao();
                formacao.setInstituicao(novaFormacao.instituicao());
                formacao.setGraduacao(graduacao);
                formacao.setCurso(novaFormacao.curso());
                formacao.setAnoInicio(novaFormacao.anoInicio());
                formacao.setAnoTermino(novaFormacao.anoTermino());
                formacao.setCurriculo(curriculo);

                formacaoRepository.save(formacao);


                formacoes.add(formacao);

            }


            curriculo.setFormacoes(formacoes);
        }



        return curriculo;

    }

@Transactional
    public void deletarCurriculo(Long id) {
    if (curriculoRepository.existsById(id)) {
        curriculoRepository.deleteById(id);
        System.out.println("Currículo deletado com sucessooooooooooooo!");
    } else {
        throw new NoSuchElementException("Currículo não encontrado");
    }
    }
}
