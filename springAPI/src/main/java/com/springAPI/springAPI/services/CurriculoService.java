package com.springAPI.springAPI.services;

import com.springAPI.springAPI.dtos.CurriculoRecordDto;
import com.springAPI.springAPI.dtos.FormacaoDto;
import com.springAPI.springAPI.models.*;
import com.springAPI.springAPI.repositories.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CurriculoService {

    private final CurriculoRepository curriculoRepository;
    private final EnderecoRepository enderecoRepository;
    private final ExperienciaRepository experienciaRepository;

    private final FormacaoRepository formacaoRepository;

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

        // Setando as informações do Body no objeto curriculo
        curriculo.setNome(curriculoRecordDto.nome());
        curriculo.setTelefone(curriculoRecordDto.telefone());
        curriculo.setFoto(curriculoRecordDto.foto());

        // Salvando o endereço primeiro para gera o id
        Endereco endereco = curriculoRecordDto.endereco();
        endereco = enderecoRepository.save(endereco);
        curriculo.setEndereco(endereco);

        // Relacionando o curriculo a infoAdicional
        InfoAdicional infoAdicional = curriculoRecordDto.infoAdicional();
        infoAdicional.setCurriculo(curriculo);
        curriculo.setInfoAdicional(infoAdicional);

        curriculoRepository.save(curriculo);

        Set<Experiencia> experiencias = curriculoRecordDto.experiencias();
        curriculo.setExperiencias(experiencias);


        // Salvando as tabelas relacionadas que dependem da criação do currículo
        for (Experiencia exp : experiencias) {
            exp.setCurriculo(curriculo);
            experienciaRepository.save(exp);

        }

        Set<Formacao> formacoes = new HashSet<>();


        for (FormacaoDto formacaoDto : curriculoRecordDto.formacoes()) {
            // Buscar a graduação pelo ID
            Graduacao graduacao = graduacaoRepository.findById(formacaoDto.idGraduacao()).orElseThrow(() -> new RuntimeException("Graduação não encontrada"));

            Formacao formacao = new Formacao();
            formacao.setCurso(formacaoDto.curso());
            formacao.setAnoInicio(formacaoDto.anoInicio());
            formacao.setAnoTermino(formacaoDto.anoTermino());
            formacao.setGraduacao(graduacao);
            formacao.setCurriculo(curriculo);
            formacoes.add(formacao);
            formacaoRepository.save(formacao);

        }


        curriculo.setFormacoes(formacoes);


        return curriculo;

    }

    @Transactional
    public Curriculo atualizarCurriculo(Long id, CurriculoRecordDto novoCurriculo) {
        Curriculo curriculo = curriculoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Currículo não encontrado"));


        curriculo.setNome(novoCurriculo.nome());
        curriculo.setTelefone(novoCurriculo.telefone());
        curriculo.setFoto(novoCurriculo.foto());

        // Atualizando endereço
        if (novoCurriculo.endereco() != null) {
            Endereco endereco = curriculo.getEndereco();
            if (endereco == null) endereco = new Endereco();
            endereco.setLogradouro(novoCurriculo.endereco().getLogradouro());
            endereco.setNumero(novoCurriculo.endereco().getNumero());
            endereco.setBairro(novoCurriculo.endereco().getBairro());
            endereco.setCidade(novoCurriculo.endereco().getCidade());
            endereco.setEstado(novoCurriculo.endereco().getEstado());
            curriculo.setEndereco(endereco);
        }

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

        curriculoRepository.save(curriculo);

        if (novoCurriculo.experiencias() != null) {
            experienciaRepository.deleteAll(curriculo.getExperiencias());

            Set<Experiencia> novasExperiencias = novoCurriculo.experiencias();
            for (Experiencia novaExperiencia : novasExperiencias) {
                novaExperiencia.setCurriculo(curriculo);  // Relaciona com o currículo
                experienciaRepository.save(novaExperiencia);
            }

            // Atualiza as experiências do currículo
            curriculo.setExperiencias(novasExperiencias);
        }

        if (novoCurriculo.formacoes() != null) {
            formacaoRepository.deleteAll(curriculo.getFormacoes());

            Set<FormacaoDto> novasFormacoes = novoCurriculo.formacoes();

            Set<Formacao> formacoes = new HashSet<>();

            for (FormacaoDto novaFormacao : novasFormacoes) {

                // Buscar a graduação pelo ID
                Graduacao graduacao = graduacaoRepository.findById(novaFormacao.idGraduacao()).get();

                Formacao formacao = new Formacao();

                formacao.setGraduacao(graduacao);
                formacao.setCurso(novaFormacao.curso());
                formacao.setAnoInicio(novaFormacao.anoInicio());
                formacao.setAnoTermino(novaFormacao.anoTermino());
                formacao.setCurriculo(curriculo);
                formacoes.add(formacao);

                formacaoRepository.save(formacao);

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
